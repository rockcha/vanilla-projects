document.addEventListener("DOMContentLoaded", loadUserDatasFromStorage);

const $userInput = document.getElementById("user");
const $emailInput = document.getElementById("email");
const $usersList = document.getElementById("users-list");
const $form = document.getElementById("form");
let userValid = false;
let emailValid = false;

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.select();
  });
});

$userInput.addEventListener("input", () => {
  userValid = checkValid($userInput);
});

$emailInput.addEventListener("input", () => {
  emailValid = checkValid($emailInput);
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (userValid && emailValid) {
    alert("등록!");
    addUserData($userInput.value, $emailInput.value);
  } else {
    alert("유효성 문제 발생!");
  }

  $form.reset();
});

//로컬에서 데이터 가져와서 반영하는 함수
function loadUserDatasFromStorage() {
  $usersList.innerHTML = ``;
  const datas = getUserDatas();

  datas.forEach((data) => {
    const li = document.createElement("li");

    const name = document.createElement("p");
    const email = document.createElement("p");
    const removeButton = document.createElement("button");

    name.textContent = `이름 : ${data.name}`;
    email.textContent = `이메일 : ${data.email}`;
    removeButton.textContent = "삭제";

    removeButton.addEventListener("click", () => {
      removeUser(data.name, data.email);
    });
    //append
    li.appendChild(name);
    li.appendChild(email);
    li.appendChild(removeButton);
    $usersList.appendChild(li);
  });
}

function checkValid($input) {
  const val = $input.value.trim();

  const parent = $input.parentElement;
  if (val.length < 5) {
    parent.className = "form-group error";
    parent.querySelector(".msg").textContent = "5글자 이상 입력해주세요.";
    return false;
  } else {
    parent.className = "form-group success";
    return true;
  }
}

function addUserData(name, email) {
  const datas = getUserDatas();
  datas.push({ name, email });
  localStorage.setItem("user-data", JSON.stringify(datas));

  loadUserDatasFromStorage();
}

function getUserDatas() {
  const datas = localStorage.getItem("user-data");

  return datas ? JSON.parse(datas) : [];
}

function removeUser(name, email) {
  const datas = getUserDatas();

  const filteredDatas = datas.filter((data) => {
    return data.name !== name || data.email !== email;
  });

  localStorage.setItem("user-data", JSON.stringify(filteredDatas));
  loadUserDatasFromStorage();
}
