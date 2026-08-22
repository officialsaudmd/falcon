const root = document.documentElement;
const savedTheme = localStorage.getItem('falcon-theme');
if (savedTheme) root.dataset.theme = savedTheme;
document.querySelectorAll('[data-theme-choice]').forEach((button) => {
  button.addEventListener('click', () => {
    root.dataset.theme = button.dataset.themeChoice;
    localStorage.setItem('falcon-theme', button.dataset.themeChoice);
  });
});
const page = root.dataset.page;
document.querySelector(`[data-nav="${page}"]`)?.classList.add('active');
document.querySelectorAll('.year').forEach((element) => { element.textContent = new Date().getFullYear(); });