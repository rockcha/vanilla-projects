const $lengthInput = document.getElementById("length");

const $lengthValue = document.getElementById("length-value");

$lengthValue.textContent = $lengthInput.value;

const $generateButton = document.getElementById("generate-btn");

const $lowercaseInput = document.getElementById("lowercase");

const $uppercaseInput = document.getElementById("uppercase");

const $numberInput = document.getElementById("number");

$passwordInput = document.getElementById("password");

$lengthInput.addEventListener("input", (e) => {
  $lengthValue.textContent = e.target.value;
});

$generateButton.addEventListener("click", () => {
  console.log($lowercaseInput.value);

  if (
    $lowercaseInput.checked === false &&
    $uppercaseInput.checked === false &&
    $numberInput.checked === false
  ) {
    alert("하나 이상은 선택해야 암호를 생성할 수 있습니다!");
    return;
  }

  //생성 시작
  //뽑을 글자 pool 정하기

  let pool = "";
  if ($lowercaseInput.checked) {
    pool += "abcdefghijklmnopqrstuvwxyz";
    console.log($lowercaseInput.parentElement.className);
    $lowercaseInput.parentElement.className = "option selected";
  } else $lowercaseInput.parentElement.className = "option";
  if ($uppercaseInput.checked) {
    pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if ($numberInput.checked) {
    pool += "0123456789";
  }

  let password = "";
  for (let i = 0; i < $lengthInput.value; ++i) {
    password += pool[generateRandomIndex(pool)];
  }

  $passwordInput.value = password;

  //위험도 로직

  setProgress();
});

function generateRandomIndex(charPool) {
  return Math.floor(Math.random() * charPool.length);
}

function setProgress() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"');
  let checkedCnt = 0;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) checkedCnt++;
  });

  const progressPercent = ($lengthInput.value / 15) * 70 + checkedCnt * 10;

  document.getElementById("progress").style.width = `${progressPercent}%`;
}

const copyButton = document.getElementById("copy-btn");

copyButton.addEventListener("click", () => {
  if ($passwordInput.value === "") return;
  navigator.clipboard
    .writeText($passwordInput.value)
    .then(() => copySuccess())
    .catch((error) => {
      alert("copy failed", error);
    });
});

function copySuccess() {
  alert("copy success");
}
