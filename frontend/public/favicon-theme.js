(function () {
  function applyFavicon(isDark) {
    var url = isDark ? '/favicon-dark.svg' : '/favicon-light.svg';
    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(function(el) {
      el.href = url;
    });
  }

  // Use the app's stored theme preference, falling back to browser preference
  function getIsDark() {
    try {
      var stored = localStorage.getItem('ui-theme');
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
    } catch(e) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  applyFavicon(getIsDark());

  // Listen for system theme changes (relevant when user has "system" or no stored pref)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    try {
      var stored = localStorage.getItem('ui-theme');
      if (!stored || stored === 'system') {
        applyFavicon(e.matches);
      }
    } catch(err) {
      applyFavicon(e.matches);
    }
  });

  // Listen for storage changes (when theme is toggled in another tab or by React)
  window.addEventListener('storage', function(e) {
    if (e.key === 'ui-theme') {
      applyFavicon(getIsDark());
    }
  });
})();