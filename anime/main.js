const genBtn = document.getElementById("gen-btn");

const API_URL = "https://picsum.photos/400/200";

genBtn.addEventListener("click", () => {
  // alert("clicked");

  const containers = document.querySelectorAll(".picture-container");
  containers.forEach((container) => {
    getRandomImg(container);
  });
});

async function getRandomImg(container) {
  try {
    const loadingText = container.firstElementChild;
    console.log(loadingText);
    loadingText.classList.add("loading");
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`네트워크 실패: ${response.status}`);
    }

    //성공적으로 가져옴
    container.style.backgroundImage = `url(${response.url})`;
    loadingText.classList.remove("loading");
  } catch (e) {
    console.log("error: ", e);
  }
}
