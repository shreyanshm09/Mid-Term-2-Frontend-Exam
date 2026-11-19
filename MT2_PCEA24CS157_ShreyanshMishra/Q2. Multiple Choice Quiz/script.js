const questions = [
  {
    question: "Which keyword declares a constant variable?",
    options: ["var", "let", "const", "static"],
    answer: 2
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "slice()"],
    answer: 0
  },
  {
    question: "What does DOM stand for?",
    options: ["Data Object Model", "Document Object Model", "Digital Ordinance Model", "Desktop Oriented Mode"],
    answer: 1
  },
  {
    question: "Which operator checks both value and type equality?",
    options: ["==", "=", "===", "!="],
    answer: 2
  }
];

let currentIndex = 0;
let score = 0;

function loadQuestion() {
  const box = document.getElementById("quiz-box");
  const q = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  let optionsHTML = "";
  for (let i = 0; i < q.options.length; i++) {
    optionsHTML += `
      <label class="option">
        <input type="radio" name="quizOption" value="${i}"> ${q.options[i]}
      </label>
    `;
  }

  box.innerHTML = `
    <h2>JavaScript Quiz</h2>
    <div class="progress">Question ${currentIndex + 1} of ${questions.length}</div>
    <div class="question">${q.question}</div>
    <div id="options-list">${optionsHTML}</div>
    <button id="next-btn" disabled>${isLast ? "Finish" : "Next"}</button>
  `;

  const radios = document.querySelectorAll('input[name="quizOption"]');
  const nextBtn = document.getElementById("next-btn");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      nextBtn.disabled = false;
    });
  });

  nextBtn.addEventListener("click", handleNext);
}

function handleNext() {
  const selected = document.querySelector('input[name="quizOption"]:checked');
  if (!selected) return;

  if (parseInt(selected.value) === questions[currentIndex].answer) {
    score++;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const box = document.getElementById("quiz-box");
  const percentage = Math.round((score / questions.length) * 100);
  let message = "";

  if (percentage === 100) {
    message = "Excellent work!";
  } else if (percentage >= 50) {
    message = "Good job!";
  } else {
    message = "Keep practising!";
  }

  box.innerHTML = `
    <div class="result">
      <h2>JavaScript Quiz</h2>
      <div class="score-big">${score} / ${questions.length}</div>
      <p>You scored ${percentage}%. ${message}</p>
      <button onclick="restartQuiz()">Restart</button>
    </div>
  `;
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  loadQuestion();
}

loadQuestion();