import { HomePage } from "./pages/home.js";
import { AboutPage } from "./pages/about.js";
import { DashBoardPage } from "./pages/dashboard.js";
import { NotFoundPage } from "./pages/notFound.js";

const router = {
  "/": HomePage,
  "/about": AboutPage,
  "/dashboard": DashBoardPage,
};

export function navigate(path) {
  //navigate막는다
  if (path === window.location.pathname) return;
  window.history.pushState(null, null, path);
}

export function renderRouter(path) {
  const app = document.getElementById("app");
  if (!app) return;

  const pageComponent = router[path] || NotFoundPage;
  const view = pageComponent();
  app.innerHTML = "";
  app.appendChild(view);
  app.focus();
}
