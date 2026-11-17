---
title: 'Acesso aos livros'
menus: 'main'
comments: false
draft: false
---

<section data-books-access data-auth-url="https://ep-blue-fog-bedld89t.neonauth.c-9.us-east-2.aws.neon.tech/livros/auth" data-api-url="https://br-red-dust-ben96zzs-livrosapi.compute.c-9.us-east-2.aws.neon.tech/">
  <h2>Área restrita</h2>
  <p>Entre com uma conta autorizada para receber links temporários dos livros.</p>
  <form data-login-form>
    <label>E-mail<br><input type="email" name="email" required autocomplete="email"></label><br>
    <label>Senha<br><input type="password" name="password" required autocomplete="current-password"></label><br>
    <button type="submit">Entrar</button>
  </form>
  <button type="button" data-logout hidden>Sair</button>
  <p data-message role="status"></p>
  <ul data-books-list></ul>
</section>

<script type="module" src="/js/livros-auth.js"></script>
