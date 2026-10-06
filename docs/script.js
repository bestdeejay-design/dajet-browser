// Dajet — Theme Switcher

(function() {
  const themeSwitcher = document.getElementById('themeSwitcher');
  const html = document.documentElement;
  const themeIcon = themeSwitcher.querySelector('.theme-icon');
  
  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem('dajet-theme') || 'dark';
  
  // Apply theme
  function setTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      themeIcon.textContent = '☀';
    } else {
      html.removeAttribute('data-theme');
      themeIcon.textContent = '☾';
    }
    localStorage.setItem('dajet-theme', theme);
  }
  
  // Initialize
  setTheme(currentTheme);
  
  // Toggle on click
  themeSwitcher.addEventListener('click', function() {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(theme);
  });
})();
