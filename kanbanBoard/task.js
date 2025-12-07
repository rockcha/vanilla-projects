import { saveDataByStatus, deleteById } from "./store.js";

export function addTaskByStatus(id, task, status) {
  const ElId = status + "-section";

  const targetSection = document.getElementById(ElId);

  addTask(id, task, targetSection);
}

function addTask(id, task, tasksSectionEl) {
  //taskBox에 고유 id dataset을 줘야함.

  const taskBox = document.createElement("div");
  taskBox.className = "task";
  taskBox.dataset.id = id;

  const taskContent = document.createElement("div");
  taskContent.textContent = task;
  taskContent.className = "task-content";

  const menu = document.createElement("menu");
  const editButton = document.createElement("button");
  const removeButton = document.createElement("button");
  editButton.textContent = "수정";
  removeButton.textContent = "삭제";

  removeButton.addEventListener("click", () => {
    taskBox.remove();

    //로컬에서 삭제
    deleteById(taskBox.dataset.id);
  });

  menu.appendChild(editButton);
  menu.appendChild(removeButton);

  taskBox.appendChild(taskContent);
  taskBox.appendChild(menu);
  tasksSectionEl.appendChild(taskBox);
}

export function createId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }
}
