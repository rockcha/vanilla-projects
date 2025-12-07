import { addTaskByStatus } from "./task.js";
// import { TASK_STATUS } from "./main.js";

export function getData() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : {
        todo: [],
        inProgress: [],
        done: [],
      };
}

export function loadData() {
  const originTasks = getData();

  Object.keys(originTasks).forEach((key) => {
    originTasks[key].forEach((taskItem) => {
      addTaskByStatus(taskItem.id, taskItem.content, key);
    });
  });
}

export function saveDataByStatus(taskObj, status) {
  let originTasks = getData();

  originTasks[status].push(taskObj);
  // 실제 업데이트

  localStorage.setItem("tasks", JSON.stringify(originTasks));
}

export function deleteById(id) {
  const data = getData();

  Object.keys(data).forEach((key) => {
    data[key] = data[key].filter((taskObj) => taskObj.id !== id);
  });

  localStorage.setItem("tasks", JSON.stringify(data));
}
