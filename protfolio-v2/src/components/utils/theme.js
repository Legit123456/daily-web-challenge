// simple theme helper used by Header and App
const THEME_KEY = "site-theme"; // values: 'light' | 'dark' | 'amoled'

export function saveTheme(name) {
  try {
    localStorage.setItem(THEME_KEY, name);
  } catch {}
}

export function loadTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(name) {
  document.body.classList.remove("light", "dark", "amoled");
  if (name === "light") document.body.classList.add("light");
  else if (name === "amoled") document.body.classList.add("amoled");
  else document.body.classList.add("dark");
}
