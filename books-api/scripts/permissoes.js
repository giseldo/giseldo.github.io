// Gerencia o acesso aos livros pelo terminal. Uso: veja a constante AJUDA.
import { execSync } from "node:child_process";
import { neon } from "@neondatabase/serverless";

const PROJECT_ID = "shiny-waterfall-71868294";
const BRANCH_ID = "br-red-dust-ben96zzs";

const AJUDA = `Uso (dentro de books-api):
  npm run permissoes -- usuarios                      lista as contas e seus livros
  npm run permissoes -- livros                        lista os livros cadastrados
  npm run permissoes -- liberar <email> <livro...>    libera um ou mais livros
  npm run permissoes -- liberar <email> todos         libera todos os livros
  npm run permissoes -- remover <email> <livro...>    remove um ou mais livros
  npm run permissoes -- remover <email> todos         remove todos os livros`;

class ErroDeUso extends Error {}

// Usa DATABASE_URL, se definida. Senão, pede a conexão ao Neon CLI.
// A conexão contém a senha do banco: ela fica só na memória.
function conexao() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    return execSync(`neon connection-string ${BRANCH_ID} --project-id ${PROJECT_ID}`, {
      encoding: "utf8",
      stdio: ["inherit", "pipe", "inherit"],
      timeout: 120000,
    }).trim();
  } catch {
    throw new ErroDeUso("Não foi possível obter a conexão. Rode 'neon auth' e tente de novo.");
  }
}

async function buscarUsuario(sql, email) {
  const [usuario] = await sql`
    SELECT id::text AS id, email FROM neon_auth."user" WHERE lower(email) = lower(${email})
  `;
  if (!usuario) throw new ErroDeUso(`Nenhuma conta com o e-mail ${email}.`);
  return usuario;
}

// Confere os IDs antes de alterar o banco, para um erro de digitação não passar despercebido.
async function resolverLivros(sql, pedidos) {
  const ids = (await sql`SELECT id FROM protected_books ORDER BY id`).map((livro) => livro.id);
  if (pedidos.length === 1 && pedidos[0] === "todos") return ids;
  const invalidos = pedidos.filter((id) => !ids.includes(id));
  if (invalidos.length) {
    throw new ErroDeUso(`Livro desconhecido: ${invalidos.join(", ")}. Disponíveis: ${ids.join(", ")}.`);
  }
  return pedidos;
}

async function listarUsuarios(sql) {
  console.table(await sql`
    SELECT u.email, u.name AS nome,
           coalesce(string_agg(p.book_id, ', ' ORDER BY p.book_id), '-') AS livros
    FROM neon_auth."user" u
    LEFT JOIN book_permissions p ON p.user_id = u.id::text
    GROUP BY u.id, u.email, u.name
    ORDER BY u.email
  `);
}

async function listarLivros(sql) {
  console.table(await sql`SELECT id, title AS titulo FROM protected_books ORDER BY id`);
}

async function alterar(sql, acao, email, pedidos) {
  const usuario = await buscarUsuario(sql, email);
  const livros = await resolverLivros(sql, pedidos);
  const alterados = acao === "liberar"
    ? await sql`
        INSERT INTO book_permissions (user_id, book_id)
        SELECT ${usuario.id}, unnest(${livros}::text[])
        ON CONFLICT DO NOTHING
        RETURNING book_id
      `
    : await sql`
        DELETE FROM book_permissions
        WHERE user_id = ${usuario.id} AND book_id = ANY(${livros}::text[])
        RETURNING book_id
      `;
  const nomes = alterados.map((linha) => linha.book_id).join(", ");
  const verbo = acao === "liberar" ? "Liberados" : "Removidos";
  console.log(nomes ? `${verbo} para ${usuario.email}: ${nomes}` : `Nada a alterar para ${usuario.email}.`);
}

async function principal() {
  const [comando, email, ...livros] = process.argv.slice(2);
  const listagens = { usuarios: listarUsuarios, livros: listarLivros };
  const altera = (comando === "liberar" || comando === "remover") && email && livros.length > 0;

  if (!Object.hasOwn(listagens, comando ?? "") && !altera) {
    console.log(AJUDA);
    if (comando && comando !== "ajuda") process.exitCode = 1;
    return;
  }

  const sql = neon(conexao());
  if (altera) await alterar(sql, comando, email, livros);
  else await listagens[comando](sql);
}

principal().catch((erro) => {
  console.error(erro instanceof ErroDeUso ? erro.message : `Erro: ${erro.message}`);
  process.exitCode = 1;
});
