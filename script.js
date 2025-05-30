// Alternar modo claro/escuro com armazenamento no navegador e fallback para preferências do sistema
const modeToggle = document.getElementById("modeToggle");
const body = document.body;

if (localStorage.getItem("mode") === "dark" ||
    (!localStorage.getItem("mode") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  body.classList.add("dark");
  modeToggle.textContent = "☀️";
}

if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      localStorage.setItem("mode", "dark");
      modeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("mode", "light");
      modeToggle.textContent = "🌙";
    }
  });
}

// Botão Voltar ao Topo
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", debounce(() => {
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}, 100));

topBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Efeito de fade-out ao navegar para outra página
document.querySelectorAll('a[href]').forEach(link => {
  const url = link.getAttribute('href');
  if (url && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
    link.addEventListener('click', event => {
      if (link.target === "_blank" || event.metaKey || event.ctrlKey) return;
      event.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = url;
      }, 300);
    });
  }
});

// Função debounce para otimizar o scroll
type DebounceFunction = (...args: any) => void;
function debounce(func, wait = 100) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
