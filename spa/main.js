// main.js

// 1. 각 URL에 대한 "페이지 렌더 함수" 정의
function renderHome() {
  return `
    <h1>홈 페이지</h1>
    <p>여기는 / (홈) 입니다.</p>
  `;
}

function renderLogin() {
  return `
    <h1>로그인</h1>
    <p>여기는 /login 입니다.</p>
    <form>
      <input placeholder="아이디" /><br />
      <input type="password" placeholder="비밀번호" /><br />
      <button type="submit">로그인</button>
    </form>
  `;
}

function renderAbout() {
  return `
    <h1>소개</h1>
    <p>바닐라 JS로 만든 SPA 예제입니다.</p>
  `;
}

function renderNotFound() {
  return `
    <h1>404</h1>
    <p>해당 페이지를 찾을 수 없습니다.</p>
  `;
}

// 2. path → 렌더 함수 매핑
const routes = {
  "/": renderHome,
  "/login": renderLogin,
  "/about": renderAbout,
};

// 3. 현재 URL에 맞는 화면 그리는 함수
function renderRoute(pathname) {
  const app = document.getElementById("app");

  const renderFunction = routes[pathname] || renderNotFound;

  app.innerHTML = renderFunction();
  setActiveLink(pathname);
}

// 네비게이션 active 스타일
function setActiveLink(pathname) {
  document
    .querySelectorAll("a[data-link]")
    .forEach((a) => a.classList.remove("active"));

  const current = document.querySelector(`a[data-link][href="${pathname}"]`);
  if (current) {
    current.classList.add("active");
  }
}

// 7. 공통 navigate 함수 (주소 변경 + 화면 렌더를 한 곳에)
function navigate(pathname) {
  // 현재 주소랑 다를 때만 pushState
  if (window.location.pathname !== pathname) {
    window.history.pushState({}, "", pathname);
  }

  // JS로 화면만 교체
  renderRoute(pathname);
}

// 4. 링크 클릭 가로채기 (서버로 안 보내고 SPA 내부에서 처리)
function onLinkClick(e) {
  const anchor = e.target.closest("a[data-link]");
  if (!anchor) return;

  e.preventDefault(); // 원래의 "페이지 이동" 막기
  const href = anchor.getAttribute("href");

  // 공통 이동 함수 사용
  navigate(href);
}

// 5. 브라우저 뒤로가기/앞으로가기 대응
window.addEventListener("popstate", () => {
  renderRoute(window.location.pathname);
});

// 6. 초기 세팅
function init() {
  document.addEventListener("click", onLinkClick);
  renderRoute(window.location.pathname);
}

init();
