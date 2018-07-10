var startGame;
var gameHTML;
var counter = 20;
var questionArray = [
  "When is Canada Day? :",
  "What is Capital city of Canada? :",
  "Who was Prime Minister of Canada in 2017? :",
  "Canada's national animal is? :",
  "How many Gold Medals did Canada won in PyeongChang 2018 Olympic Winter Games? :"
];
var answerArray = [
  ["July 1st", "June 1st", "September 30th", "December 31st"],
  ["Toronto", "Ottawa", "Montreal", " Vancouver"],
  ["Stephen Harper", "Jean Chrétien", "Justin Trudeau", "Brian Mulroney"],
  ["Beaver", "Fennec fox", "Fallow deer", "Baird's tapir"],
  ["15", "8", "10", "11"]
];
var imageArray = [
  "<img src='assets/images/july1st.png'>",
  "<img src='assets/images/ottawa.jpeg'>",
  "<img src='assets/images/justintrudeau.JPEG'>",
  "<img src='assets/images/Beaver.png'>",
  "<img src='assets/images/11.jpeg'>"
];
var correctAnswers = [
  "A. July 1st",
  "B. Ottawa",
  "C. Justin Trudeau",
  "A. Beaver",
  "D. 11"
];
var questionCounter = 0;
var selecterAnswer;
var Clock;
var correct = 0;
var wrong = 0;
var unanswered = 0;

$(document).ready(function() {
  // Code to create splash with start button
  function splash() {
    startGame = "<a class='start-button'>Start Quiz</a>";
    $(".game").html(startGame);
  }
  splash();

  // Code to Generate questions when cliked start button
  $("body").on("click", ".start-button", function(event) {
    createHTML();
    countdown();
  });

  // Code to determinr if user choise of answer is right or wrong
  $("body").on("click", ".answer", function(event) {
    selectedAnswer = $(this).text();
    if (selectedAnswer === correctAnswers[questionCounter]) {
      //If the choice is correct, 1 is added to win and display winning message. Otherwise, one is added to losses and display loss message.
      //Note: clearInterval is a JS feature that clears a timer with a setInterval() method
      // source https://www.w3schools.com/jsref/met_win_clearinterval.asp
      clearInterval(Clock);
      winMessage();
    } else {
      clearInterval(Clock);
      lossMessage();
    }
  });

  // Code to reset the game
  $("body").on("click", ".reset-button", function(event) {
    resetGame();
  });
});

// If time-out, then 1 is addded to losses, and display message that they ran out of time.
function timeOutLoss() {
  unanswered++;
  gameHTML =
    "<p>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p>You ran out of time!  The correct answer was: " +
    correctAnswers[questionCounter] +
    "</p>" +
    "<img class='center-block img-wrong' src='assets/images/x.png'>";
  $(".game").html(gameHTML);
  setTimeout(questionAsked, 5000);
}

// If user answers correctly. 1 is added to wins, and win message is displayed.
function winMessage() {
  correct++;
  gameHTML =
    "<p>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p>Correct! The answer is: " +
    correctAnswers[questionCounter] +
    "</p>" +
    imageArray[questionCounter];
  $(".game").html(gameHTML);
  setTimeout(questionAsked, 5000);
}
// If user answers wrong. 1 is added to losses, and loss message is displayed.
function lossMessage() {
  wrong++;
  gameHTML =
    "<p>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p>Wrong! The correct answer is: " +
    correctAnswers[questionCounter] +
    "</p>" +
    "<img class='center-block img-wrong' src='assets/images/x.png'>";
  $(".game").html(gameHTML);
  setTimeout(questionAsked, 5000);
}

// When game is over. User can view their score of wins, losses, and unanswered
function createHTML() {
  gameHTML =
    "<p>Time Remaining: <span class='timer'>20</span></p><p>" +
    questionArray[questionCounter] +
    "</p><p class='first-answer answer'>A. " +
    answerArray[questionCounter][0] +
    "</p><p class='answer'>B. " +
    answerArray[questionCounter][1] +
    "</p><p class='answer'>C. " +
    answerArray[questionCounter][2] +
    "</p><p class='answer'>D. " +
    answerArray[questionCounter][3] +
    "</p>";
  $(".game").html(gameHTML);
}

function questionAsked() {
  if (questionCounter < 4) {
    questionCounter++;
    createHTML();
    counter = 20;
    countdown();
  } else {
    finalScreen();
  }
}

function countdown() {
  Clock = setInterval(timed, 1000);
  function timed() {
    if (counter === 0) {
      clearInterval(Clock);
      timeOutLoss();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML =
    "<p>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p>Below is your score!" +
    "</p>" +
    "<p>Correct Answers: " +
    correct +
    "</p>" +
    "<p>Wrong Answers: " +
    wrong +
    "</p>" +
    "<p>Unanswered: " +
    unanswered +
    "</p>" +
    "<a class='reset-button' href='#' role='button'>Reset Quiz!</a>";
  $(".game").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correct = 0;
  wrong = 0;
  unanswered = 0;
  counter = 20;
  createHTML();
  countdown();
}
