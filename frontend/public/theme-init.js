(function() {
  function getTheme() {
    const stored = localStorage.getItem('ui-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  const theme = getTheme();
  document.documentElement.classList.add(theme);
})();
