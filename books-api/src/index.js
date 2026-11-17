import { neon } from "@neondatabase/serverless";
import { Files } from "files-sdk";
import { neon as neonStorage } from "files-sdk/neon";
import { createRemoteJWKSet, jwtVerify } from "jose";

const sql = neon(process.env.DATABASE_URL);
const files = new Files({ adapter: neonStorage({ bucket: "livros-privados" }) });
const jwks = createRemoteJWKSet(new URL(process.env.NEON_AUTH_JWKS_URL));
const issuer = new URL(process.env.NEON_AUTH_BASE_URL).origin;
const allowedOrigins = new Set(["https://giseldo.github.io", "http://localhost:1313"]);

function cors(request) {
  const origin = request.headers.get("origin");
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://giseldo.github.io",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
    "Vary": "Origin",
  };
}

function json(request, body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: cors(request) });
}

async function authenticatedUser(request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  try {
    const { payload } = await jwtVerify(authorization.slice(7), jwks, { issuer });
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(request) });
    if (request.method !== "GET") return json(request, { error: "Método não permitido" }, 405);

    const userId = await authenticatedUser(request);
    if (!userId) return json(request, { error: "Faça login para acessar os livros" }, 401);

    const books = await sql`
      SELECT b.id, b.title, b.description, b.file_key
      FROM protected_books b
      INNER JOIN book_permissions p ON p.book_id = b.id
      WHERE p.user_id = ${userId}
      ORDER BY b.title
    `;
    const result = await Promise.all(books.map(async (book) => ({
      id: book.id,
      title: book.title,
      description: book.description,
      url: await files.url(book.file_key, { expiresIn: 300 }),
    })));

    return json(request, { books: result });
  },
};
