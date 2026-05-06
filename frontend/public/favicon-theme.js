(function () {
  function applyFavicon(isDark) {
    var url = isDark ? '/favicon-light.svg' : '/favicon-dark.svg';
    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(function(el) {
      el.href = url + '?v=2';
    });
  }

  // Only use browser preference for favicon
  function getIsDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Apply immediately
  applyFavicon(getIsDark());

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    applyFavicon(e.matches);
  });
})();