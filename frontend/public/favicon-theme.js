(function () {
  function applyFavicon(isDark) {
    const url = isDark ? '/favicon-dark.svg' : '/favicon-light.svg';
    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(el => {
      el.href = url;
    });
  }

  applyFavicon(window.matchMedia('(prefers-color-scheme: dark)').matches);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    applyFavicon(e.matches);
  });
})();