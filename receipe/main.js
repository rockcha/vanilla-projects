// const url =
//   "https://data.gg.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=6T98794V0223GQQ9O1P42464027&infSeq=3";

// getData();
// async function getData() {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//   } catch (e) {
//     console.log("error: ", e);
//   }
// }

const categories_url = "https://www.themealdb.com/api/json/v1/1/categories.php";
const searchByCategories_url =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

async function run() {
  const response = await fetch(categories_url);
  const data = await response.json();

  setCategoriesButton(data.categories);
}

run();

function setCategoriesButton(categoriesArr) {
  const categoriesSection = document.getElementById("categories-section");
  categoriesArr.forEach((cate) => {
    const btn = document.createElement("button");
    //data 저장
    btn.textContent = cate.strCategory;
    btn.dataset.category = cate.strCategory;
    //이벤트 리스너
    btn.addEventListener("click", (e) => {
      loadDataByCategory(e.target.dataset.category);

      console.log(e.target.dataset.category, "가 눌림!");
    });
    btn.className = "category-btn";

    categoriesSection.appendChild(btn);
  });
}

const searchByNameUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const inputEl = document.getElementById("input");
const inputBtn = document.getElementById("input-btn");

const msgBox = document.getElementById("message-box");

const mealSection = document.getElementById("meal-section");

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const input = inputEl.value.trim();

    if (!input) {
      alert("올바른 input이 아닙니다.");
      return;
    }
    searchMeal();
  }
});

inputBtn.addEventListener("click", () => {
  const input = inputEl.value.trim();

  if (!input) {
    alert("올바른 input이 아닙니다.");
    return;
  }
  searchMeal();
});

async function searchMeal() {
  const input = inputEl.value.trim();

  try {
    const response = await fetch(searchByNameUrl + `${input}`);
    const data = await response.json();

    console.log(data.meals);
    if (!data.meals) {
      msgBox.classList.remove("hidden");
      msgBox.textContent = "결과가 없습니다.";
      return;
    }

    loadMealContainer(data);
  } catch (error) {
    console.log("error: ", error);
  }
}

function loadMealContainer(data, cate) {
  mealSection.innerHTML = ``;

  let strCategory = cate ? cate : data.meals.strCategory;

  data.meals.forEach((meal) => {
    mealSection.innerHTML += `
       <div class="meal-container">
       <img class="meal-img" src="${meal.strMealThumb}">
      <div class="meal-info">
        <div class="category-badge">
        ${strCategory}</div>
        <p class="meal-title">${meal.strMeal}</p>
      </div>
    </div>
    `;
  });
}

async function loadDataByCategory(cate) {
  mealSection.innerHTML = ``;
  const url = searchByCategories_url + cate;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  loadMealContainer(data, cate);
}
