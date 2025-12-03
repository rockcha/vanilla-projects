const registerBtn = document.getElementById("register-btn");

const userInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("confirm-password");

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = false;

  const isRequired = checkValid([
    userInput,
    emailInput,
    passwordInput,
    passwordConfirmInput,
  ]);

  isValid = isRequired;

  if (isRequired) {
    console.log("hello");
    const isUserNameValid = checkLength(userInput, 3, 15);
    // const isEmailValid = checkEmail(emailInput);
    // const isPasswordValid = checkLength(passwordInput, 6, 25);
    // const isPasswordsMatch = checkPasswordMatch(password, passwordConfirmInput);

    isValid =
      isUserNameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }

  setTimeout(() => {
    form.reset();
  }, 3000);
});

function reset() {
  userInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  passwordConfirmInput = "";

  console.log(form.children);
}

function checkValid(inputArr) {
  let valid = true;
  inputArr.forEach((input) => {
    const inputVal = input.value.trim();

    if (inputVal === "") {
      showError(input, `${input.id} is required`);
      valid = false;
    } else if (inputVal !== "") {
      showSuccess(input);
    }
  });
  return valid;
}

function showError(input, text) {
  const formItem = input.parentElement;
  formItem.className = "form-item error";
  const small = formItem.querySelector("small");
  small.textContent = text;
}

function showSuccess(input) {
  const formItem = input.parentElement;
  formItem.className = "form-item valid";
}

function checkLength(input, min, max) {
  if (input.value.length < min)
    showError(input, `${input.id} should be more than ${min} characters`);
  else if (input.val.length > max)
    showError(input, `${input.id} should be less than ${max} characters`);
}

function checkEmail() {}

function checkPasswordMatch() {}
