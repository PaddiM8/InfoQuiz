var currentQuestion = 0;

window.onload = function() { loadQuestion(0); }

var answers = document.getElementById("answers");
var continueButton = document.getElementById("continue");

answers.addEventListener("click", function (evt) {
   var question = questions[currentQuestion];
   var correctAnswerId = question.correctAnswer;

   if (evt.target.className == "answer") {
      for (i = 0; i < answers.children.length; i++)
         answers.children[i].classList.add("inactive");

      if (question.answers[correctAnswerId] == evt.target.innerHTML) {
         evt.target.className = "answer correct";
      } else {
         evt.target.className = "answer incorrect";
         answers.children[correctAnswerId].className = "answer correct";
      }

      continueButton.classList.toggle("slide-down");
   }
}, false);

continueButton.getElementsByClassName("arrow")[0].addEventListener("click", function() {
   continueButton.classList.toggle("slide-down");
   for (i = 0; i < answers.children.length; i++) {
      var answer = answers.children[i];
      answer.classList.toggle("expand");

      if (answer.classList.contains("correct")) answer.classList.toggle("correct");
      if (answer.classList.contains("incorrect")) answer.classList.toggle("incorrect");
   }

   answers.children[2].classList.toggle("bottom-left-radius");
   answers.children[3].classList.toggle("bottom-right-radius");

   document.getElementById("question").classList.toggle("expand-question");

   var text = document.getElementById("text");
   text.style.zIndex = "10";
   text.classList.toggle("show-text");
});

function loadQuestion(id) {
   var question = document.getElementById("question");
   question.innerHTML = questions[id].question;
   currentQuestion = id;

   for (i = 0; i < answers.children.length; i++)
      answers.children[i].innerHTML = questions[id].answers[i];

   console.log(questions[id].sources.join("<br />"));
   document.getElementById("content").innerHTML = questions[id].text;
   document.getElementById("sources").innerHTML = questions[id].sources.join("<br />");
}
