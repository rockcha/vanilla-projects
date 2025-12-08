// router.js
import { HomePage } from "./pages/home.js";
import { AboutPage } from "./pages/about.js";
import { DashBoardPage } from "./pages/dashboard.js";
import { NotFoundPage } from "./pages/notFound.js";

const routes = {
  "/": HomePage,
  "/about": AboutPage,
  "/dashboard": DashBoardPage,
};

const app = document.getElementById("app");

function render(path) {
  const Page = routes[path] || NotFoundPage;
  const view = Page();
  app.innerHTML = "";
  app.appendChild(view);
}

function navigate(path) {
  if (path === window.location.pathname) return;
  window.history.pushState(null, "", path);
  render(path);
}

function handleLinkClick(e) {
  const anchor = e.target.closest("a[data-link]");
  if (!anchor) return;

  e.preventDefault();
  const href = anchor.getAttribute("href");
  navigate(href);
  setActive(anchor);
}

function setActive(target) {
  document.querySelectorAll("a[data-link]").forEach((a) => {
    a.classList.toggle("active", a === target);
    a.toggleAttribute("aria-current", a === target);
  });
}

export function initRouter() {
  // 초기 렌더
  let path = window.location.pathname;

  if (path === "/spa_practice2/index.html") path = "/";

  render(path);
  const currentAnchor = document.querySelector(`a[data-link][href="${path}"]`);
  if (currentAnchor) setActive(currentAnchor);

  // nav 클릭
  document.querySelector("nav").addEventListener("click", handleLinkClick);

  // 뒤로가기 / 앞으로가기
  window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    render(path);
    const targetAnchor = document.querySelector(`a[data-link][href="${path}"]`);
    if (targetAnchor) setActive(targetAnchor);
  });
}
