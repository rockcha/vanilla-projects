import { navigate, renderRouter } from "./router.js";

function onLinkClicked(e) {
  const anchor = e.target.closest("a[data-link]");
  if (!anchor) return;

  e.preventDefault();

  //active 처리
  setActive(anchor);
  // 실제 링크 변경
  const href = anchor.getAttribute("href");
  if (href) navigate(href);
  renderRouter(href);
}

function init() {
  //이벤트 위임으로 링크 클릭 로직 바꾸기
  document.querySelector("nav").addEventListener("click", onLinkClicked);

  const path =
    window.location.pathname === "/index.html" ? "/" : window.location.pathname;

  renderRouter(path);

  //setActive 초기에 해줘야함
  const targetAnchor = document.querySelector(`a[data-link][href="${path}"]`);

  console.log(targetAnchor);
  console.log(path);
  if (targetAnchor) setActive(targetAnchor);

  //popstate

  window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    renderRouter(path);

    const targetAnchor = document.querySelector(`a[data-link][href=${path}]`);
    if (targetAnchor) setActive(targetAnchor);
  });
}

function setActive(tar) {
  const anchors = document.querySelectorAll("a[data-link]");
  anchors.forEach((anchor) => {
    anchor.classList.remove("active");
    anchor.removeAttribute("aria-current");
  });

  tar.classList.add("active");
  tar.setAttribute("aria-current", "page");
}

init();
