//페이지 렌더 함수
console.log("hello");
function renderHome() {
  return `<h1>홈</h1>`;
}

function renderModal() {
  return `<h1>모달</h1>`;
}

function renderDraggable() {
  return `<h1>드래그&드롭</h1>`;
}

function renderNotFound() {
  return `<h1>404</h1>`;
}

//렌더 함수 매핑

const routes = {
  "/": renderHome,
  "/modal": renderModal,
  "/draggable": renderDraggable,
};

function renderRoute(pathname) {
  const app = document.getElementById("app");

  const renderFunction = routes[pathname] || renderNotFound;

  app.innerHTML = renderFunction();

  // setActiveLink(pathname);
}

function navigate(pathname) {
  if (window.location.pathname !== pathname) {
    window.history.pushState(null, null, pathname);
  }
  renderRoute(pathname);
}

// 5. 브라우저 뒤로가기/앞으로가기 대응
window.addEventListener("popstate", () => {
  renderRoute(window.location.pathname);
});

function onLinkClick(e) {
  console.log("clicke");
  const anchor = e.target.closest("a[data-link]");
  if (!anchor) return;

  e.preventDefault();
  const href = anchor.getAttribute("href");
  navigate(href);
}

function init() {
  document.addEventListener("click", onLinkClick);
  renderRoute(window.location.pathname);
}

init();
