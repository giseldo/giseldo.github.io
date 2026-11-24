---
title: 'Acesso aos livros'
menus: 'main'
comments: false
draft: false
---

<style>
  [data-books-access] { --book-accent:#2563eb; max-width:760px; margin:1.5rem auto 3rem; padding:clamp(1.25rem,4vw,2.5rem); border:1px solid #cbd5e1; border-radius:20px; background:var(--card-background,rgba(148,163,184,.07)); box-shadow:0 12px 32px rgba(15,23,42,.08); }
  [data-books-access] h2 { margin:0 0 .6rem; font-size:clamp(1.55rem,3vw,2rem); }
  [data-books-access] > p:first-of-type { margin-bottom:1.5rem; line-height:1.6; }
  [data-books-access] form { display:grid; gap:1rem; margin:1rem 0; }
  [data-books-access] form[hidden], [data-books-access] [hidden] { display:none !important; }
  [data-books-access] label { display:block; font-weight:600; line-height:1.5; }
  [data-books-access] label input { display:block; width:100%; box-sizing:border-box; min-height:50px; margin-top:.4rem; padding:.75rem 1rem; font:inherit; color:inherit; background:var(--body-background,#fff); border:1px solid #94a3b8; border-radius:10px; }
  [data-books-access] button, [data-books-access] [data-books-list] a { display:inline-flex; align-items:center; justify-content:center; box-sizing:border-box; min-height:48px; padding:.75rem 1.25rem; border:1px solid #64748b; border-radius:10px; font:inherit; font-weight:650; line-height:1.4; text-align:center; cursor:pointer; text-decoration:none; transition:background .15s,transform .15s; }
  [data-books-access] form button[type=submit], [data-books-access] [data-books-list] a { background:var(--book-accent); border-color:var(--book-accent); color:#fff; }
  [data-books-access] button:hover, [data-books-access] [data-books-list] a:hover { filter:brightness(.92); transform:translateY(-1px); }
  [data-books-access] button:focus-visible, [data-books-access] input:focus-visible, [data-books-access] a:focus-visible { outline:3px solid #60a5fa; outline-offset:3px; }
  [data-books-access] > button { margin:.4rem .5rem .4rem 0; }
  [data-books-access] [data-message]:not(:empty) { padding:.85rem 1rem; border-radius:10px; background:rgba(37,99,235,.09); }
  [data-books-access] [data-message][data-error=true] { background:rgba(220,38,38,.12); }
  [data-books-access] [data-books-list] { list-style:none; padding:0; margin:1.25rem 0 0; display:grid; gap:.75rem; }
  [data-books-access] [data-books-list] li { margin:0; padding:0; }
  [data-books-access] [data-books-list] a { width:100%; justify-content:flex-start; overflow-wrap:anywhere; }
  @media(max-width:560px) { [data-books-access] > button, [data-books-access] form button { width:100%; margin:.3rem 0; } }
  @media(prefers-reduced-motion:reduce) { [data-books-access] button, [data-books-access] a { transition:none; } }
</style>

<section data-books-access data-auth-url="https://ep-blue-fog-bedld89t.neonauth.c-9.us-east-2.aws.neon.tech/livros/auth" data-api-url="https://br-red-dust-ben96zzs-livrosapi.compute.c-9.us-east-2.aws.neon.tech/">
  <h2>Área restrita</h2>
  <p>Entre com uma conta autorizada para receber links temporários dos livros.</p>
  <form data-login-form>
    <label>E-mail<input type="email" name="email" required autocomplete="email"></label>
    <label>Senha<input type="password" name="password" required autocomplete="current-password"></label>
    <button type="submit">Entrar</button>
  </form>
  <button type="button" data-otp-login>Entrar com código por e-mail</button>
  <form data-otp-form hidden>
    <h3>Confirmar e-mail</h3>
    <p>Digite o código enviado para seu e-mail.</p>
    <label>Código<input type="text" name="otp" inputmode="numeric" autocomplete="one-time-code" minlength="6" maxlength="8" required></label>
    <button type="submit">Confirmar código</button>
    <button type="button" data-resend-otp>Enviar outro código</button>
  </form>
  <form data-signup-form hidden>
    <h3>Criar conta</h3>
    <p>Depois do cadastro, o acesso a cada livro é liberado pelo autor.</p>
    <label>Nome<input type="text" name="signup-name" required autocomplete="name"></label>
    <label>E-mail<input type="email" name="signup-email" required autocomplete="email"></label>
    <label>Senha<input type="password" name="signup-password" required minlength="8" autocomplete="new-password"></label>
    <label>Confirmar senha<input type="password" name="signup-confirm" required minlength="8" autocomplete="new-password"></label>
    <button type="submit">Criar conta</button>
  </form>
  <form data-recovery-form hidden>
    <h3>Redefinir senha</h3>
    <label>E-mail<input type="email" name="recovery-email" required autocomplete="email"></label>
    <button type="submit">Enviar recuperação</button>
  </form>
  <form data-reset-form hidden>
    <h3>Escolher nova senha</h3>
    <label>Nova senha<input type="password" name="new-password" required minlength="8" autocomplete="new-password"></label>
    <label>Confirmar senha<input type="password" name="confirm-password" required minlength="8" autocomplete="new-password"></label>
    <button type="submit">Salvar nova senha</button>
  </form>
  <button type="button" data-signup>Criar nova conta</button>
  <button type="button" data-recovery>Esqueci minha senha</button>
  <button type="button" data-back-login hidden>Voltar para o login</button>
  <button type="button" data-logout hidden>Sair</button>
  <p data-message role="status"></p>
  <ul data-books-list></ul>
</section>

<script type="module" src="/js/livros-auth.js"></script>
