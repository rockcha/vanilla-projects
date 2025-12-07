import { getData, loadData } from "./store.js";
import { addTaskByStatus, createId } from "./task.js";
import { saveDataByStatus } from "./store.js";

export const TASK_STATUS = Object.freeze({
  TODO: "todo",
  IN_PROGRESS: "inProgress",
  DONE: "done",
});

const addTaskButton = document.getElementById("add-btn");
const addModal = document.getElementById("add-dialog");
const cancelButton = document.getElementById("cancel-btn");
const input = document.getElementById("addInput");

//로컬스토리지 업데이트
loadData();

cancelButton.addEventListener("click", () => {
  addModal.close();
});
addTaskButton.addEventListener("click", () => {
  addModal.showModal();
});

addModal.addEventListener("close", () => {
  const action = addModal.returnValue;

  if (action === "confirm") {
    const objId = createId();
    // update dom
    addTaskByStatus(objId, input.value.trim(), TASK_STATUS.TODO);

    const taskObj = { id: objId, content: input.value.trim() };
    saveDataByStatus(taskObj, TASK_STATUS.TODO);
  }

  input.value = "";
});

addModal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    addModal.close();
  }
});
