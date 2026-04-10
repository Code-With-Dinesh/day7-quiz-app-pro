let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];
let timeLeft = 10;
let timer;

function loadQuestion() {
  clearInterval(timer);

  let q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  let optionsHTML = "";
  q.options.forEach((opt, index) => {
    optionsHTML += `<div class="option" onclick="selectOption(${index})">${opt}</div>`;
  });

  document.getElementById("options").innerHTML = optionsHTML;

  if (selectedAnswers[currentQuestion] !== undefined) {
    document
      .querySelectorAll(".option")
      [selectedAnswers[currentQuestion]].classList.add("selected");
  }

  updateProgress();
  startTimer();
}

function selectOption(index) {
  selectedAnswers[currentQuestion] = index;

  document
    .querySelectorAll(".option")
    .forEach((opt) => opt.classList.remove("selected"));
  document.querySelectorAll(".option")[index].classList.add("selected");
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function updateProgress() {
  let progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").innerText = timeLeft + "s";

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft + "s";

    if (timeLeft <= 0) nextQuestion();
  }, 1000);
}

function showResult() {
  clearInterval(timer);

  score = 0;
  questions.forEach((q, i) => {
    if (selectedAnswers[i] === q.answer) score++;
  });

  document.querySelector(".quiz-card").classList.add("hidden");
  document.getElementById("result-card").classList.remove("hidden");

  document.getElementById("score").innerText = score + "/" + questions.length;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswers = [];

  document.querySelector(".quiz-card").classList.remove("hidden");
  document.getElementById("result-card").classList.add("hidden");

  loadQuestion();
}

window.onload = loadQuestion;
