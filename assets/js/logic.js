document.getElementById('start').addEventListener("click", Start)
document.getElementById('submit').addEventListener("click", submit)

var index = 0;
var question = document.getElementById('question-title');
var choices = document.getElementById('choices');
var correctAnswer = '';
var myQuestions = document.getElementById('questions');
var secondsLeft = 75;
var quizzing = true;
var historicScores = JSON.parse(localStorage.getItem('high scores'))
if (historicScores === null) {
    historicScores = [];
}

timer = document.getElementById('time');

myQuestions.addEventListener('click', (event) => {
    if ((event.target.id === correctAnswer) && (index === 4)) {
        End()
    } else if (event.target.id === correctAnswer) {
        playCorrect();
        document.getElementById('correctResult').className = 'show';
        document.getElementById('incorrectResult').className = 'hide';
        clearQuestions();
        populateQuestion();
    } else {
        secondsLeft = secondsLeft -10;
        timer.textContent = secondsLeft
        playIncorrect();
        document.getElementById('incorrectResult').className = 'show';
        document.getElementById('correctResult').className = 'hide';
    }
})

function Start() {
    document.getElementById('start-screen').className = 'hide';
    document.getElementById('questions').className = 'show';
    timer.textContent = 75;
    populateQuestion();
    startTimer();
}
function End() {
    document.getElementById('questions').className = 'hide';
    document.getElementById('end-screen').className = 'show';
    document.getElementById('incorrectResult').className = 'hide';
    document.getElementById('correctResult').className = 'hide';
    stopTimer();
    document.getElementById("final-score").textContent = secondsLeft;
}

function populateQuestion() {
    question.textContent = questions[index].title
    for (var i = 0; i < questions[index].choices.length; i++) {
        var opt = questions[index].choices[i];
        var el = document.createElement("button");
        el.textContent = opt;
        el.value = opt;
        el.id = [i];
        choices.appendChild(el);
    } 
    correctAnswer = questions[index].answer;
    index++;
}

function clearQuestions() {
    for (var i = 0; i < 4; i++) {
        document.getElementById(i).remove();
    }
}

function startTimer() {
    timeValue = setInterval (function() {
        secondsLeft = secondsLeft - 1;
        timer.textContent = secondsLeft
        if (secondsLeft === 0) {
        End();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timeValue);
}

function submit() {
    var newScore = {
        initials: document.querySelector("#initials").value.slice(0,3).toUpperCase(),
        score: secondsLeft,
    }
    historicScores.push(newScore);
    sorter();
    var highScores = JSON.stringify(historicScores);
    localStorage.setItem("high scores", highScores);
}

function sorter() {
    historicScores.sort((a,b) => b.score - a.score);
}

function playCorrect() {
    var audio = document.getElementById("audioCorrect");
    audio.play();
}
function playIncorrect() {
    var audio = document.getElementById("audioIncorrect");
    audio.play();
}