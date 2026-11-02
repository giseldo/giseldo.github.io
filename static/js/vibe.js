/* Tema claro/escuro e gaveta de navegação no celular. Sem dependências. */
(function () {
  var root = document.documentElement;

  /* ---------- Tema ---------- */
  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function syncThemeButtons() {
    var dark = currentTheme() === 'dark';
    var label = dark ? 'Usar tema claro' : 'Usar tema escuro';
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      var text = buttons[i].querySelector('[data-theme-label]');
      if (text) text.textContent = label;
      else buttons[i].setAttribute('aria-label', label);
    }
  }

  function setTheme(theme, remember) {
    root.setAttribute('data-theme', theme);
    if (remember) {
      try { localStorage.setItem('tema', theme); } catch (e) { /* armazenamento bloqueado: o tema vale só nesta visita */ }
    }
    syncThemeButtons();
  }

  document.addEventListener('click', function (event) {
    var toggle = event.target.closest('[data-theme-toggle]');
    if (toggle) setTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
  });

  // Acompanha o sistema enquanto a pessoa não escolheu um tema.
  if (window.matchMedia) {
    var query = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystemChange = function (event) {
      var saved = null;
      try { saved = localStorage.getItem('tema'); } catch (e) { /* ignora */ }
      if (!saved) setTheme(event.matches ? 'dark' : 'light', false);
    };
    if (query.addEventListener) query.addEventListener('change', onSystemChange);
    else if (query.addListener) query.addListener(onSystemChange);
  }

  syncThemeButtons();

  /* ---------- Gaveta de navegação (celular) ---------- */
  var openButton = document.querySelector('[data-nav-open]');
  var closeButton = document.querySelector('.sidebar-close');
  var appMain = document.querySelector('.app-main');
  var lastFocus = null;

  function setNav(open) {
    root.classList.toggle('nav-open', open);
    if (openButton) {
      openButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      openButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    }
    if (appMain) {
      if (open) appMain.setAttribute('inert', '');
      else appMain.removeAttribute('inert');
    }
    if (open) {
      lastFocus = document.activeElement;
      if (closeButton) closeButton.focus();
    } else if (lastFocus && lastFocus.focus) {
      lastFocus.focus();
      lastFocus = null;
    }
  }

  document.addEventListener('click', function (event) {
    if (event.target.closest('[data-nav-open]')) {
      setNav(!root.classList.contains('nav-open'));
    } else if (root.classList.contains('nav-open') &&
               (event.target.closest('[data-nav-close]') || event.target.closest('.sidebar a'))) {
      setNav(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && root.classList.contains('nav-open')) setNav(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768 && root.classList.contains('nav-open')) setNav(false);
  });
})();
