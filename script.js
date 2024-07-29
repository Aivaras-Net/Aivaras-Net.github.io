document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const answersContainer = document.getElementById("answers-container");
  const progress = document.getElementById("progress");

  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;

  fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then((response) => response.json())
    .then((data) => {
      questions = data.results;
      displayQuestion();
    });

  function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      const answers = [
        ...question.incorrect_answers,
        question.correct_answer,
      ].sort(() => Math.random() - 0.5);
      questionContainer.innerHTML = `<p class="text-lg mb-4">${question.question}</p>`;
      answersContainer.innerHTML = answers
        .map(
          (answer) =>
            `<button class="answer-button" onclick="checkAnswer('${answer}', '${question.correct_answer}')">${answer}</button>`
        )
        .join("");
      progress.innerHTML = `${currentQuestionIndex + 1} / ${questions.length}`;
    } else {
      showResults();
    }
  }

  window.checkAnswer = (selectedAnswer, correctAnswer) => {
    if (selectedAnswer === correctAnswer) {
      score++;
    }
    currentQuestionIndex++;
    displayQuestion();
  };

  function showResults() {
    questionContainer.innerHTML = `<p class="text-lg">Congratulations, you answered ${score} / ${questions.length} questions correctly.</p>`;
    answersContainer.innerHTML = `<button class="play-again-btn" onclick="restartQuiz()">Play 1 more time</button>`;
    progress.innerHTML = "";
  }

  window.restartQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
  };
});
