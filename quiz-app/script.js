const startButton = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const question = document.getElementById("question");
const answerContainer = document.getElementById("answer-container");
const scoreSpan = document.getElementById("score");
const resultScreen = document.getElementById("result-screen");
startButton.addEventListener("click", startQuiz);

let score = 0;
let currentQuestionIndex = -1;
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "What is the largest ocean in the world?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
    ],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Charles Dickens", correct: false },
      { text: "Leo Tolstoy", correct: false },
    ],
  },
  {
    question: "What is the boiling point of water?",
    answers: [
      { text: "50°C", correct: false },
      { text: "100°C", correct: true },
      { text: "150°C", correct: false },
      { text: "200°C", correct: false },
    ],
  },
];

let selectDiabled = false;
let totalQuestions = quizQuestions.length;
function startQuiz() {
  //변수들 리셋
  currentQuestionIndex = -1;
  selectDiabled = false;
  totalQuestions = quizQuestions.length;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showNextQuiz();
}

function showNextQuiz() {
  currentQuestionIndex++;
  selectDisabled = false;

  if (currentQuestionIndex >= quizQuestions.length) {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
  }

  question.innerText = quizQuestions[currentQuestionIndex].question;
  answerContainer.innerHTML = ``;

  const currentAnswers = quizQuestions[currentQuestionIndex].answers;

  currentAnswers.forEach((answer) => {
    const newButton = document.createElement("button");
    newButton.className = "answer-btn";
    newButton.innerText = answer.text;
    newButton.dataset.correct = answer.correct;
    newButton.addEventListener("click", AnswerSelected);
    answerContainer.appendChild(newButton);
  });
}

function AnswerSelected(e) {
  if (selectDiabled) return;
  selectDisabled = true;

  if (e.target.dataset.correct === "true") {
    score++;
    scoreSpan.innerText = score;
    
  }

  Array.from(answerContainer.children).forEach((answerBtn) => {
    if (answerBtn.dataset.correct === "true") {
      answerBtn.classList.add("correct");
    } else answerBtn.classList.add("incorrect");
  });

  setTimeout(showNextQuiz, 2000);
}
