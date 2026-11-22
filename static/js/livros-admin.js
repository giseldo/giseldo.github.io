import { createAuthClient } from "https://esm.sh/@neon/auth@latest";

const root = document.querySelector("[data-admin]");
if (!root) throw new Error("Painel de administração não encontrado.");

const auth = createAuthClient(root.dataset.authUrl);
const adminUrl = root.dataset.apiUrl.replace(/\/+$/, "") + "/admin";
const loginForm = root.querySelector("[data-login-form]");
const panel = root.querySelector("[data-panel]");
const list = root.querySelector("[data-requests]");
const message = root.querySelector("[data-message]");

function showMessage(text, error = false) {
  message.textContent = text;
  message.dataset.error = error ? "true" : "false";
}

function escapeHtml(value) {
  const el = document.createElement("div");
  el.textContent = value ?? "";
  return el.innerHTML;
}

async function api(options = {}) {
  const tokenResult = await auth.token();
  if (tokenResult.error || !tokenResult.data?.token) return { status: 401 };
  const response = await fetch(adminUrl, {
    ...options,
    headers: { Authorization: `Bearer ${tokenResult.data.token}`, "Content-Type": "application/json" },
  });
  return { status: response.status, data: await response.json().catch(() => ({})) };
}

function render({ requests, books }) {
  if (!requests.length) {
    list.innerHTML = "<p>Nenhum pedido pendente.</p>";
    return;
  }
  list.innerHTML = requests.map((r) => `
    <div class="request" data-user="${escapeHtml(r.user_id)}">
      <h3>${escapeHtml(r.email || "(e-mail não informado)")}</h3>
      <small>ID ${escapeHtml(r.user_id)} · pedido em ${new Date(r.requested_at).toLocaleString("pt-BR")}</small>
      <div class="books">
        ${books.map((b) => `<label><input type="checkbox" value="${escapeHtml(b.id)}" checked>${escapeHtml(b.title)}</label>`).join("")}
      </div>
      <div class="actions">
        <button type="button" class="primary" data-action="approve">Aprovar</button>
        <button type="button" class="danger" data-action="reject">Recusar</button>
      </div>
    </div>`).join("");
}

async function load() {
  showMessage("Carregando pedidos...");
  const result = await api();
  if (result.status === 401) {
    panel.hidden = true;
    loginForm.hidden = false;
    return showMessage("Faça login para continuar.");
  }
  if (result.status === 403) {
    panel.hidden = true;
    return showMessage("Esta conta não é administradora.", true);
  }
  if (result.status !== 200) return showMessage("Não foi possível carregar os pedidos.", true);
  loginForm.hidden = true;
  panel.hidden = false;
  render(result.data);
  showMessage("");
}

list.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const card = button.closest(".request");
  const action = button.dataset.action;
  const bookIds = [...card.querySelectorAll("input:checked")].map((i) => i.value);
  if (action === "approve" && !bookIds.length && !confirm("Aprovar sem liberar nenhum livro?")) return;
  card.querySelectorAll("button").forEach((b) => (b.disabled = true));
  const result = await api({ method: "POST", body: JSON.stringify({ userId: card.dataset.user, action, bookIds }) });
  if (result.status !== 200) {
    card.querySelectorAll("button").forEach((b) => (b.disabled = false));
    return showMessage("Não foi possível registrar a decisão.", true);
  }
  card.remove();
  showMessage(action === "approve" ? "Usuário aprovado." : "Pedido recusado.");
  if (!list.querySelector(".request")) list.innerHTML = "<p>Nenhum pedido pendente.</p>";
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  showMessage("Entrando...");
  try {
    const result = await auth.signIn.email({
      email: loginForm.email.value.trim(),
      password: loginForm.password.value,
    });
    if (result.error) return showMessage("E-mail ou senha inválidos.", true);
    await load();
  } catch {
    showMessage("Não foi possível concluir o login.", true);
  }
});

root.querySelector("[data-refresh]").addEventListener("click", load);
root.querySelector("[data-logout]").addEventListener("click", async () => {
  await auth.signOut();
  panel.hidden = true;
  loginForm.hidden = false;
  list.innerHTML = "";
  showMessage("Sessão encerrada.");
});

load().catch(() => showMessage("Faça login para continuar."));
