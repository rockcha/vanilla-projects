const addInput = document.getElementById("add-input");
const addBtn = document.getElementById("add-btn");
const listContainer = document.getElementById("list-container");
const tabSection = document.getElementById("tab-section");

let currentTab = "all";

loadShoppingListFromLS();

tabSection.addEventListener("click", (e) => {
  const clickedTab = e.target.closest(".tab-btn");
  if (!clickedTab) return;

  if (currentTab === e.target.id) return;

  //순회하면서, 기존 active 제거 후 , 새로 active추가
  Array.from(tabSection.children).forEach((tab) => {
    tab.classList.remove("active");

    if (tab.id === clickedTab.id) {
      tab.classList.add("active");
      currentTab = tab.id;
    }
  });

  loadShoppingListFromLS();

  setEmptyContainer();
});

addBtn.addEventListener("click", () => {
  const inputVal = addInput.value.trim();

  if (inputVal === "") {
    alert("유효하지 않는 값입니다.");
    return;
  }
  const newItem = {
    id: crypto.randomUUID(),
    completed: false,
    name: inputVal,
  };
  addItem(newItem);

  //로컬 스토리지 실제 업데이트

  const newShoppingList = [...getShoppingListFromLS(), newItem];
  localStorage.setItem("shopping-list", JSON.stringify(newShoppingList));

  //초기화

  addInput.value = "";
  addInput.focus();
});

addInput.addEventListener("keydown", (e) => {
  const inputVal = addInput.value.trim();
  if (e.key === "Enter") {
    if (inputVal === "") {
      alert("유효하지 않는 값입니다.");
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      completed: false,
      name: inputVal,
    };

    addItem(newItem);

    //로컬 스토리지 실제 업데이트
    const newShoppingList = [...getShoppingListFromLS(), newItem];
    localStorage.setItem("shopping-list", JSON.stringify(newShoppingList));

    //초기화
    addInput.value = "";
    addInput.focus();
  }
});

function addItem({ id, completed, name }) {
  //ui 업데이트

  const li = document.createElement("li");
  li.className = "list-item";
  li.dataset.id = id;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("click", () => {
    toggleCheck(li);

    updateCheckedInLS(id, checkbox.checked);
    loadShoppingListFromLS();
    setEmptyContainer();
  });

  const namebox = document.createElement("input");
  namebox.type = "text";
  namebox.value = name;
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";

  removeBtn.addEventListener("click", (e) => {
    //로컬스토리지에서 데이터 삭제

    removeItemFromLS(li.dataset.id);
    //ui 업데이트

    li.remove();

    setEmptyContainer();
  });

  li.appendChild(checkbox);
  li.appendChild(namebox);
  li.appendChild(removeBtn);
  listContainer.appendChild(li);

  setEmptyContainer();
}

function setEmptyContainer() {
  const emptyContainer = document.querySelector(".empty-container");

  if (listContainer.childElementCount === 0) {
    emptyContainer.classList.remove("hidden");
  } else {
    emptyContainer.classList.add("hidden");
  }
}

function toggleCheck(li) {
  if (li.className === "list-item") {
    li.classList.add("completed");
  } else if (li.className === "list-item completed") {
    li.classList.remove("completed");
  }
}

function getShoppingListFromLS() {
  return localStorage.getItem("shopping-list")
    ? JSON.parse(localStorage.getItem("shopping-list"))
    : [];
}

function loadShoppingListFromLS() {
  listContainer.innerHTML = ``;
  const shoppingList = getShoppingListFromLS();
  if (currentTab === "all") {
    shoppingList.forEach((item) => {
      addItem(item);
    });
  } else if (currentTab === "incomplete") {
    const filteredList = shoppingList.filter((item) => {
      return item.completed === false;
    });

    filteredList.forEach((item) => {
      addItem(item);
    });
  } else if (currentTab === "completed") {
    const filteredList = shoppingList.filter((item) => {
      return item.completed === true;
    });
    filteredList.forEach((item) => {
      addItem(item);
    });
  } else {
    alert("currentTab 에 잘못된 문자열 들어감!");
    return;
  }
}

function removeItemFromLS(id) {
  if (!id) return;

  const newList = getShoppingListFromLS().filter((item) => {
    return item.id !== id;
  });

  localStorage.setItem("shopping-list", JSON.stringify(newList));
}

function updateCheckedInLS(id, checked) {
  const shoppingList = getShoppingListFromLS();

  for (const item of shoppingList) {
    if (item.id === id) {
      item.completed = checked;
      break;
    }
  }

  localStorage.setItem("shopping-list", JSON.stringify(shoppingList));
}
