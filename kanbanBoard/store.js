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
  console.log(originTasks);

  Object.keys(originTasks).forEach((key) => {
    originTasks[key].forEach((taskItem) => {
      addTaskByStatus(taskItem.content, key);
    });
  });
}

export function saveDataByStatus(taskObj, status) {
  let originTasks = getData();
  console.log(status, originTasks[status]);
  originTasks[status].push(taskObj);
  // 실제 업데이트

  localStorage.setItem("tasks", JSON.stringify(originTasks));
}
