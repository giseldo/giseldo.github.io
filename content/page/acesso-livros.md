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
  <button type="button" data-otp-login>Entrar com código por e-mail</button>
  <form data-otp-form hidden>
    <h3>Confirmar e-mail</h3>
    <p>Digite o código enviado para seu e-mail.</p>
    <label>Código<br><input type="text" name="otp" inputmode="numeric" autocomplete="one-time-code" minlength="6" maxlength="8" required></label><br>
    <button type="submit">Confirmar código</button>
    <button type="button" data-resend-otp>Enviar outro código</button>
  </form>
  <form data-recovery-form hidden>
    <h3>Redefinir senha</h3>
    <label>E-mail<br><input type="email" name="recovery-email" required autocomplete="email"></label><br>
    <button type="submit">Enviar recuperação</button>
  </form>
  <form data-reset-form hidden>
    <h3>Escolher nova senha</h3>
    <label>Nova senha<br><input type="password" name="new-password" required minlength="8" autocomplete="new-password"></label><br>
    <label>Confirmar senha<br><input type="password" name="confirm-password" required minlength="8" autocomplete="new-password"></label><br>
    <button type="submit">Salvar nova senha</button>
  </form>
  <button type="button" data-recovery>Esqueci minha senha</button>
  <button type="button" data-back-login hidden>Voltar para o login</button>
  <button type="button" data-logout hidden>Sair</button>
  <p data-message role="status"></p>
  <ul data-books-list></ul>
</section>

<script type="module" src="/js/livros-auth.js"></script>
