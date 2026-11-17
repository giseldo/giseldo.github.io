import { createAuthClient } from "https://esm.sh/@neon/auth@latest";

const root = document.querySelector("[data-books-access]");
if (!root) throw new Error("Área de acesso aos livros não encontrada.");

const auth = createAuthClient(root.dataset.authUrl);
const apiUrl = root.dataset.apiUrl;
const loginForm = root.querySelector("[data-login-form]");
const email = root.querySelector("[name=email]");
const password = root.querySelector("[name=password]");
const message = root.querySelector("[data-message]");
const booksList = root.querySelector("[data-books-list]");
const logout = root.querySelector("[data-logout]");

function showMessage(text, error = false) {
  message.textContent = text;
  message.dataset.error = error ? "true" : "false";
}

async function loadBooks() {
  const tokenResult = await auth.token();
  if (tokenResult.error || !tokenResult.data?.token) return false;
  const result = await fetch(apiUrl, { headers: { Authorization: `Bearer ${tokenResult.data.token}` } });
  if (!result.ok) return false;
  const { books } = await result.json();
  booksList.innerHTML = books.length
    ? books.map((book) => `<li><a href="${book.url}" target="_blank" rel="noopener">${book.title}</a></li>`).join("")
    : "<li>Nenhum livro liberado para esta conta.</li>";
  loginForm.hidden = true;
  logout.hidden = false;
  showMessage("Acesso autorizado. Os links expiram em 5 minutos.");
  return true;
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  showMessage("Entrando...");
  const result = await auth.signIn.email({ email: email.value, password: password.value });
  if (result.error) return showMessage("E-mail ou senha inválidos.", true);
  if (!(await loadBooks())) showMessage("A conta ainda não possui acesso aos livros.", true);
});

logout.addEventListener("click", async () => {
  await auth.signOut();
  loginForm.hidden = false;
  logout.hidden = true;
  booksList.innerHTML = "";
  showMessage("Sessão encerrada.");
});

loadBooks().catch(() => showMessage("Faça login para continuar."));
