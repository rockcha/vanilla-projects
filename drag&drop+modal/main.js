const openModalBtn = document.getElementById("openModal-btn");
const modal = document.getElementById("modal");
openModalBtn.addEventListener("click", () => {
  modal.showModal();
});

modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    modal.close();
  }
});

const addListBtn = document.getElementById("add-list-btn");

const addInput = document.getElementById("add-input");
const lists = document.getElementById("lists");

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!addInput.value.trim()) return;
  addList(addInput.value.trim());
});

function addList(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.className = "list";
  li.draggable = true;

  li.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
  });
  li.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });

  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(removeButton);
  lists.appendChild(li);
}

lists.addEventListener("dragover", (e) => {
  e.preventDefault();
  const target = e.target.closest("li");
  const draggedItem = document.querySelector(".dragging");
  if (target && target !== draggedItem) {
    //유효한 target이다

    const { top, height } = target.getBoundingClientRect();

    const midPoint = top + height / 2;

    if (e.clientY < midPoint) {
      //위에있다면,
      target.before(draggedItem);
    } else {
      //아래에 있다면,
      target.after(draggedItem);
    }
  }
});
