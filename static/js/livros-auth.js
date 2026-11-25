import { createAuthClient } from "https://esm.sh/@neon/auth@latest";

const root = document.querySelector("[data-books-access]");
if (!root) throw new Error("Área de acesso aos livros não encontrada.");

const auth = createAuthClient(root.dataset.authUrl);
const apiUrl = root.dataset.apiUrl;
const loginForm = root.querySelector("[data-login-form]");
const otpForm = root.querySelector("[data-otp-form]");
const email = root.querySelector("[name=email]");
const password = root.querySelector("[name=password]");
const otpInput = root.querySelector("[name=otp]");
const message = root.querySelector("[data-message]");
const booksList = root.querySelector("[data-books-list]");
const logout = root.querySelector("[data-logout]");
const recoveryForm = root.querySelector("[data-recovery-form]");
const resetForm = root.querySelector("[data-reset-form]");
const recoveryButton = root.querySelector("[data-recovery]");
const otpLoginButton = root.querySelector("[data-otp-login]");
const resendOtpButton = root.querySelector("[data-resend-otp]");
const backLoginButton = root.querySelector("[data-back-login]");
const signupForm = root.querySelector("[data-signup-form]");
const signupButton = root.querySelector("[data-signup]");
let pendingOtpEmail = "";

function showMessage(text, error = false) {
  message.textContent = text;
  message.dataset.error = error ? "true" : "false";
}

function showView(activeForm) {
  for (const form of [loginForm, otpForm, signupForm, recoveryForm, resetForm]) {
    form.hidden = form !== activeForm;
  }
  const isLogin = activeForm === loginForm;
  otpLoginButton.hidden = !isLogin;
  signupButton.hidden = !isLogin;
  recoveryButton.hidden = !isLogin;
  backLoginButton.hidden = isLogin;
}

const showLogin = () => showView(loginForm);
const showRecovery = () => showView(recoveryForm);
const showReset = () => showView(resetForm);
const showSignup = () => showView(signupForm);

function showOtp() {
  showView(otpForm);
  otpInput.focus();
}

// A biblioteca lança uma exceção quando o servidor recusa o pedido. Aqui a recusa
// volta como result.error, e só as falhas sem resposta HTTP continuam como exceção.
async function request(operation) {
  try {
    return await operation();
  } catch (error) {
    if (!error?.status) throw error;
    return { error: error.error || error };
  }
}

async function loadBooks() {
  const tokenResult = await request(() => auth.token());
  if (tokenResult.error || !tokenResult.data?.token) return false;
  const result = await fetch(apiUrl, { headers: { Authorization: `Bearer ${tokenResult.data.token}` } });
  if (!result.ok) return false;
  const { books } = await result.json();
  booksList.innerHTML = books.length
    ? books.map((book) => `<li><a href="${book.url}" target="_blank" rel="noopener">${book.title}</a></li>`).join("")
    : "<li>Nenhum livro liberado para esta conta.</li>";
  showView(null);
  backLoginButton.hidden = true;
  logout.hidden = false;
  showMessage("Acesso autorizado. Os links expiram em 5 minutos.");
  return true;
}

async function requestOtp() {
  const requestedEmail = email.value.trim();
  if (!requestedEmail) return showMessage("Informe seu e-mail antes de solicitar o código.", true);
  pendingOtpEmail = requestedEmail;
  showMessage("Enviando código por e-mail...");
  try {
    const result = await request(() => auth.emailOtp.sendVerificationOtp({ email: pendingOtpEmail, type: "sign-in" }));
    if (result.error) return showMessage("Não foi possível enviar o código.", true);
    showOtp();
    showMessage("Código enviado. Verifique sua caixa de entrada e o spam.");
  } catch (error) {
    showMessage("Não foi possível conectar ao serviço de autenticação.", true);
  }
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  showMessage("Entrando...");
  try {
    const result = await request(() => auth.signIn.email({ email: email.value.trim(), password: password.value }));
    if (result.error) {
      showMessage("E-mail ou senha inválidos. Você também pode entrar usando um código por e-mail.", true);
      return;
    }
    if (!(await loadBooks())) showMessage("A conta ainda não possui acesso aos livros.", true);
  } catch (error) {
    showMessage("Não foi possível concluir o login. Tente novamente.", true);
  }
});

otpLoginButton.addEventListener("click", requestOtp);

resendOtpButton.addEventListener("click", async () => {
  email.value = pendingOtpEmail;
  await requestOtp();
});

otpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  showMessage("Confirmando código...");
  try {
    const result = await request(() => auth.signIn.emailOtp({ email: pendingOtpEmail, otp: otpInput.value.trim(), disableSignUp: true }));
    if (result.error) return showMessage("Código inválido ou expirado.", true);
    if (!(await loadBooks())) showMessage("A conta ainda não possui acesso aos livros.", true);
  } catch (error) {
    showMessage("Não foi possível confirmar o código. Tente novamente.", true);
  }
});

signupButton.addEventListener("click", () => {
  showSignup();
  signupForm.querySelector("[name=signup-email]").value = email.value;
  showMessage("Preencha os dados para criar sua conta.");
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = signupForm.querySelector("[name=signup-name]").value.trim();
  const signupEmail = signupForm.querySelector("[name=signup-email]").value.trim();
  const signupPassword = signupForm.querySelector("[name=signup-password]").value;
  const confirm = signupForm.querySelector("[name=signup-confirm]").value;
  if (signupPassword !== confirm) return showMessage("As senhas não coincidem.", true);
  showMessage("Criando conta...");
  try {
    const result = await request(() => auth.signUp.email({ name, email: signupEmail, password: signupPassword }));
    if (result.error) {
      if (result.error.code === "EMAIL_PASSWORD_SIGN_UP_DISABLED") {
        return showMessage("O cadastro de novas contas está desativado no momento.", true);
      }
      const exists = /exist|already/i.test(result.error.message || result.error.code || "");
      return showMessage(exists ? "Já existe uma conta com este e-mail. Use o login ou recupere a senha." : "Não foi possível criar a conta.", true);
    }
    signupForm.reset();
    if (await loadBooks()) {
      showMessage("Conta criada. O acesso aos livros será liberado pelo autor.");
    } else {
      email.value = signupEmail;
      showLogin();
      showMessage("Conta criada. Confirme seu e-mail, se solicitado, e depois entre.");
    }
  } catch (error) {
    showMessage("Não foi possível conectar ao serviço de autenticação.", true);
  }
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
  try {
    const result = await request(() => auth.requestPasswordReset({
      email: recoveryEmail,
      redirectTo: window.location.href.split("?")[0],
    }));
    if (result.error) return showMessage("Não foi possível enviar o link de recuperação.", true);
    showMessage("Verifique seu e-mail para escolher uma nova senha.");
  } catch (error) {
    showMessage("Não foi possível conectar ao serviço de autenticação.", true);
  }
});

resetForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newPassword = resetForm.querySelector("[name=new-password]").value;
  const confirmPassword = resetForm.querySelector("[name=confirm-password]").value;
  const token = new URLSearchParams(window.location.search).get("token");
  if (newPassword !== confirmPassword) return showMessage("As senhas não coincidem.", true);
  if (!token) return showMessage("O link de recuperação é inválido ou expirou.", true);
  showMessage("Salvando nova senha...");
  try {
    const result = await request(() => auth.resetPassword({ newPassword, token }));
    if (result.error) return showMessage("O link expirou ou é inválido.", true);
    window.history.replaceState({}, document.title, window.location.pathname);
    showLogin();
    showMessage("Senha alterada. Agora você pode entrar.");
  } catch (error) {
    showMessage("Não foi possível alterar a senha.", true);
  }
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
