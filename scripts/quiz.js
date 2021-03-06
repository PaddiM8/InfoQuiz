let currentQuestion = 0;
let volume = 0.3;

window.onload = function() { loadQuestion(0); }

let answers = document.getElementById("answers");
let continueButton = document.getElementById("continue");

answers.addEventListener("click", function (evt) {
   let question = questions[currentQuestion];
   let correctAnswerId = question.correctAnswer;

   if (evt.target.className == "answer tile") {
      for (i = 0; i < answers.children.length; i++)
         answers.children[i].classList.add("inactive");

      console.log(question.answers[correctAnswerId] +", " + evt.target.innerHTML);
      if (question.answers[correctAnswerId] == evt.target.innerHTML) {
         evt.target.className = "answer tile correct";
         let audio = new Audio("resources/Correct.wav");
         audio.volume = volume;
         audio.play();
      } else {
         evt.target.className = "answer tile incorrect";
         answers.children[correctAnswerId].className = "answer tile correct";
         let audio = new Audio("resources/Buzz.wav");
         audio.volume = volume;
         audio.play();
      }

      continueButton.classList.toggle("slide-down");
   }
}, false);

document.getElementById("continueArrow").addEventListener("click", toggleQuiz);

let quizMode = true;
function toggleQuiz() {
   let audio = new Audio("resources/Click2.wav");
   audio.volume = volume;
   audio.play();

   continueButton.classList.toggle("slide-down");

   for (i = 0; i < answers.children.length; i++) {
      let answer = answers.children[i];
      answer.classList.toggle("expand");

      if (answer.classList.contains("correct")) answer.classList.toggle("correct");
      if (answer.classList.contains("incorrect")) answer.classList.toggle("incorrect");
   }

   answers.children[2].classList.toggle("bottom-left-radius");
   answers.children[3].classList.toggle("bottom-right-radius");

   if (answers.style.marginBottom != "10px")
        answers.style.marginBottom = "10px";
   else answers.style.marginBottom = "0";

   document.getElementById("question").classList.toggle("expand-question");

   if (quizMode) {
      setTimeout(function() {
         document.getElementById("text").classList.toggle("show-text");
      }, 200);

      setTimeout(function() {
         continueButton.classList.toggle("slide-down");
         quizMode = false;
      }, 800);
   } else {
      for (i = 0; i < answers.children.length; i++) {
         if (answers.children[i].classList.contains("inactive"))
            answers.children[i].classList.toggle("inactive");
      }

      document.getElementById("text").classList.toggle("show-text");
      quizMode = true;
      if (currentQuestion < questions.length -  1)
           loadQuestion(currentQuestion + 1);
      else loadQuestion(0);
   }
}

function loadQuestion(id) {
   let question = document.getElementById("question");
   question.innerHTML = questions[id].question;
   currentQuestion = id;

   for (i = 0; i < answers.children.length; i++)
      answers.children[i].innerHTML = questions[id].answers[i];

   console.log(questions[id].sources.join("<br />"));
   document.getElementById("content").innerHTML = questions[id].text;
   document.getElementById("sources").innerHTML = questions[id].sources.join("<br />");
}
