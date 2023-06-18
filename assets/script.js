const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const timerContainer = document.getElementById("timer-container");
const resultContainer = document.getElementById("result-container");
const scoreContainer = document.getElementById("score-container");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");
const highscoresContainer = document.getElementById("highscores-container");
const highscoresList = document.getElementById("highscores-list");
const save = document.getElementById("save");
const initialsDiv = document.getElementById ("initialsSection");

let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let timerInterval;

// Define your questions here add more questions as needed
const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<javascript>", correct: false },
      { text: "<js>", correct: false },
      { text: "<script>", correct: true }
    ]
  },
  {
    question: "How do you write a conditional statement for executing some statements only if 'i' is equal to 5?",
    answers: [
      { text: "if i==5 then", correct: false },
      { text: "if (i==5)", correct: true },
      { text: "if i=5 then", correct: false }
    ]
  },
  {
    question: "What do we use to check if two numbers are equal?",
    answers: [
      { text: "=", correct: false },
      { text: "!==", correct: false },
      { text: "===", correct: true }
    ]
  },
  {
    question: "What is an else statement?",
    answers: [
      { text: "A conditional that runs when the if statement's condition is true", correct: false },
      { text: "A conditional that runs when the if statement's condition is false", correct: true },
      { text: "A conditional that runs regardless if true or false", correct: false }
    ]
  },
  {
    question: "What are values like booleans, strings, and numbers called?",
    answers: [
      { text: "types", correct: true },
      { text: "variables", correct: false },
      { text: "let", correct: false }
    ]
  },
  {
    question: "Which value is a type of boolean?",
    answers: [
      { text: "true", correct: true },
      { text: "43", correct: false },
      { text: "45.8", correct: false }
    ]
  },
  {
    question: "Which logical operator gives us true if all conditions are true?",
    answers: [
      { text: "||", correct: false },
      { text: "&&", correct: true },
      { text: "!===", correct: false }
    ]
  },
  {
    question: "Which are arithmetic operators?",
    answers: [
      { text: "+, =, /", correct: false },
      { text: "/, *, +", correct: true },
      { text: "*, =, +", correct: false }
    ]
  },
];

function startQuiz() {
    startButton.disabled = true;
    startButton.style.display = "none";
    startTimer();
  
    showQuestion();
  }

function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    timerContainer.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  const question = questions[currentQuestionIndex];

  questionContainer.innerHTML = "";
  questionContainer.textContent = question.question;
  questionContainer.style.fontSize = "24px";

  for (let i = 0; i < question.answers.length; i++) {
    const answer = question.answers[i];
    const button = document.createElement("button");
    button.textContent = answer.text;

    button.addEventListener("click", function() {
      if (answer.correct) {
        score++;
      } else {
        timeLeft -= 10;
      }

      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    });

    questionContainer.appendChild(button);
  }
}

function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.innerHTML = "";
    timerContainer.textContent = "";
  
    resultContainer.textContent = "Quiz Over!";
    scoreContainer.textContent = "Final Score: " + score;
  
    highscoresContainer.style.display = "block"; // Show the high scores section
    initialsDiv.setAttribute("style", "display:block")
  
    // Save initials and score in local storage
    const initials = initialsInput.value.trim();
    console.log(initials)
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    highScores.forEach(item => {
      console.log(item)
      var li = document.createElement ("li")
      li.textContent = item.initials + ' - ' + item.score;
      highscoresList.append (li)
    });
    updateHighScores();
  }

  function updateHighScores() {
    // Get high scores from local storage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Sort high scores in descending order based on the score
    highScores.sort((a, b) => b.score - a.score);
  
    // Clear high scores list
    highscoresList.innerHTML = "";
  
    // Add high scores to the list, limited to top 4 scores
    for (let i = 0; i < Math.min(highScores.length, 5); i++) {
      const listItem = document.createElement("li");
      const initialsSpan = document.createElement("span");
      const scoreSpan = document.createElement("span");
  
      // Get the initials from the high score
      const initials = highScores[i].initials;
      
      // Add the initials and score to the list item
      initialsSpan.textContent = initials;
      scoreSpan.textContent = highScores[i].score;
  
      listItem.appendChild(initialsSpan);
      listItem.appendChild(document.createTextNode(" - ")); // Add separator
      listItem.appendChild(scoreSpan);
  
      highscoresList.appendChild(listItem);
    }
  }

startButton.addEventListener("click", startQuiz);

// Show high scores when high score button is clicked
document.getElementById("highscore-btn").addEventListener("click", function() {
  if (highscoresContainer.style.display === "block") {
    highscoresContainer.style.display = "none";
  } else {
    updateHighScores();
    highscoresContainer.style.display = "block";
  }
});


document.getElementById("save").addEventListener("click", function() {
  // Save initials and score in local storage
  const initials = initialsInput.value.trim();
  console.log(initials)
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials: initials, score: score });
  localStorage.setItem("highScores", JSON.stringify(highScores));
  var li = document.createElement ("li")
  li.textContent = initials + " - " + score;
  highscoresList.append (li)
  window.location.reload();
});