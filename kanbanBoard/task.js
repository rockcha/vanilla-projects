import { saveDataByStatus } from "./store.js";

export function addTaskByStatus(task, status) {
  const id = status + "-section";

  const targetSection = document.getElementById(id);

  addTask(task, targetSection);
}

function addTask(task, tasksSectionEl) {
  //taskBox에 고유 id dataset을 줘야함.

  const taskBox = document.createElement("div");
  taskBox.className = "task";

  const taskContent = document.createElement("div");
  taskContent.textContent = task;
  taskContent.className = "task-content";

  const menu = document.createElement("menu");
  const editButton = document.createElement("button");
  const removeButton = document.createElement("button");
  editButton.textContent = "수정";
  removeButton.textContent = "삭제";
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
