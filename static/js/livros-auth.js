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
const recoveryForm = root.querySelector("[data-recovery-form]");
const resetForm = root.querySelector("[data-reset-form]");
const recoveryButton = root.querySelector("[data-recovery]");
const backLoginButton = root.querySelector("[data-back-login]");

function showMessage(text, error = false) {
  message.textContent = text;
  message.dataset.error = error ? "true" : "false";
}

function showLogin() {
  loginForm.hidden = false;
  recoveryForm.hidden = true;
  resetForm.hidden = true;
  recoveryButton.hidden = false;
  backLoginButton.hidden = true;
}

function showRecovery() {
  loginForm.hidden = true;
  recoveryForm.hidden = false;
  resetForm.hidden = true;
  recoveryButton.hidden = true;
  backLoginButton.hidden = false;
}

function showReset() {
  loginForm.hidden = true;
  recoveryForm.hidden = true;
  resetForm.hidden = false;
  recoveryButton.hidden = true;
  backLoginButton.hidden = false;
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
  recoveryButton.hidden = true;
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

recoveryButton.addEventListener("click", () => {
  showRecovery();
  recoveryForm.querySelector("[name=recovery-email]").value = email.value;
  showMessage("Informe seu e-mail para receber o link de recuperação.");
});

backLoginButton.addEventListener("click", () => {
  showLogin();
  showMessage("");
});

recoveryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const recoveryEmail = recoveryForm.querySelector("[name=recovery-email]").value;
  showMessage("Enviando link de recuperação...");
  const result = await auth.requestPasswordReset({
    email: recoveryEmail,
    redirectTo: window.location.href.split("?")[0],
  });
  if (result.error) return showMessage("Não foi possível enviar o link de recuperação.", true);
  showMessage("Verifique seu e-mail para escolher uma nova senha.");
});

resetForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newPassword = resetForm.querySelector("[name=new-password]").value;
  const confirmPassword = resetForm.querySelector("[name=confirm-password]").value;
  const token = new URLSearchParams(window.location.search).get("token");
  if (newPassword !== confirmPassword) return showMessage("As senhas não coincidem.", true);
  if (!token) return showMessage("O link de recuperação é inválido ou expirou.", true);
  showMessage("Salvando nova senha...");
  const result = await auth.resetPassword({ newPassword, token });
  if (result.error) return showMessage("O link expirou ou é inválido.", true);
  window.history.replaceState({}, document.title, window.location.pathname);
  showLogin();
  showMessage("Senha alterada. Agora você pode entrar.");
});

logout.addEventListener("click", async () => {
  await auth.signOut();
  showLogin();
  logout.hidden = true;
  booksList.innerHTML = "";
  showMessage("Sessão encerrada.");
});

if (new URLSearchParams(window.location.search).has("token")) {
  showReset();
  showMessage("Escolha uma nova senha.");
} else {
  showLogin();
  loadBooks().catch(() => showMessage("Faça login para continuar."));
}
