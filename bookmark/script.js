const nameInput = document.getElementById("name-input");
const urlInput = document.getElementById("url-input");
const addButton = document.getElementById("add-button");
const inputForm = document.getElementById("add-bookmark-section");
const bookmarkList = document.getElementById("bookmark-list");
document.addEventListener("DOMContentLoaded", loadBookmarks);
let bookmarkName = "";
let url = "";

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  bookmarkName = nameInput.value.trim();
  url = urlInput.value.trim();

  if (!bookmarkName || !url) {
    alert("빈 입력은 허용하지 않습니다");
    return;
  }
  if (!url.startsWith("http") || !url.startsWith("https")) {
    alert("url 형식을 확인해주세요");
    return;
  }

  saveBookmark(bookmarkName, url);
  addBookmark(bookmarkName, url);
  nameInput.value = "";
  urlInput.value = "";
  nameInput.focus();
});

function addBookmark(name, url) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const removeButton = document.createElement("button");

  a.textContent = name;
  a.target = "_blank";
  a.href = url;

  removeButton.textContent = "remove";
  removeButton.addEventListener("click", () => {
    li.remove();

    removeBookmark(name, url);
  });
  li.appendChild(a);
  li.appendChild(removeButton);

  bookmarkList.appendChild(li);
  bookmarkName = "";
  url = "";
}

function loadBookmarks() {
  const bookmarks = getBookmarksFromStorage();

  bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}
function saveBookmark(name, url) {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
function removeBookmark(name, url) {
  let bookmarks = getBookmarksFromStorage();

  bookmarks = bookmarks.filter((bookmark) => {
    return bookmark.name !== name || bookmark.url !== url;
  });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function getBookmarksFromStorage() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}
