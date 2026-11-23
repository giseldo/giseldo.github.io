---
title: 'Administração de acessos'
comments: false
draft: false
---

<style>
  [data-admin] { max-width:760px; margin:1.5rem auto 3rem; padding:clamp(1.25rem,4vw,2.5rem); border:1px solid #cbd5e1; border-radius:20px; }
  [data-admin] [hidden] { display:none !important; }
  [data-admin] form { display:grid; gap:1rem; }
  [data-admin] label { display:block; font-weight:600; }
  [data-admin] input[type=email], [data-admin] input[type=password] { display:block; width:100%; box-sizing:border-box; min-height:48px; margin-top:.4rem; padding:.7rem 1rem; font:inherit; border:1px solid #94a3b8; border-radius:10px; }
  [data-admin] button { min-height:44px; padding:.6rem 1.1rem; border:1px solid #64748b; border-radius:10px; font:inherit; font-weight:650; cursor:pointer; }
  [data-admin] button.primary { background:#2563eb; border-color:#2563eb; color:#fff; }
  [data-admin] button.danger { background:#dc2626; border-color:#dc2626; color:#fff; }
  [data-admin] button:disabled { opacity:.6; cursor:wait; }
  [data-admin] .request { border:1px solid #cbd5e1; border-radius:14px; padding:1rem; margin:1rem 0; }
  [data-admin] .request h3 { margin:0 0 .25rem; overflow-wrap:anywhere; }
  [data-admin] .request small { opacity:.75; }
  [data-admin] .books { display:flex; flex-wrap:wrap; gap:.4rem 1rem; margin:.75rem 0; }
  [data-admin] .books label { font-weight:400; display:flex; gap:.4rem; align-items:center; }
  [data-admin] .actions { display:flex; gap:.5rem; flex-wrap:wrap; }
  [data-admin] [data-message]:not(:empty) { padding:.8rem 1rem; border-radius:10px; background:rgba(37,99,235,.09); }
  [data-admin] [data-message][data-error=true] { background:rgba(220,38,38,.12); }
</style>

<section data-admin data-auth-url="https://ep-blue-fog-bedld89t.neonauth.c-9.us-east-2.aws.neon.tech/livros/auth" data-api-url="https://br-red-dust-ben96zzs-livrosapi.compute.c-9.us-east-2.aws.neon.tech/">
  <h2>Pedidos de acesso</h2>
  <form data-login-form>
    <label>E-mail<input type="email" name="email" required autocomplete="email"></label>
    <label>Senha<input type="password" name="password" required autocomplete="current-password"></label>
    <button type="submit" class="primary">Entrar</button>
  </form>
  <div data-panel hidden>
    <button type="button" data-refresh>Atualizar</button>
    <button type="button" data-logout>Sair</button>
    <div data-requests></div>
  </div>
  <p data-message role="status"></p>
</section>

<script type="module" src="/js/livros-admin.js"></script>
