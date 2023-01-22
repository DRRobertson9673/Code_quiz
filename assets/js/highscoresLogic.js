// settings variabls and gettings high scores from local storage
var scoreList = document.querySelector("#highscores");
var LocalHighScores = JSON.parse(localStorage.getItem('high scores'));
if (LocalHighScores === null) {
    LocalHighScores = [];
}

// event listener for clear button
document.getElementById('clear').addEventListener("click", clearLocal);

// function to populate highscores list
populateHighscores();


function populateHighscores() {
    for (var i = 0; i < LocalHighScores.length; i++) {
        var newScore = (LocalHighScores[i].initials + ' Score: ' + LocalHighScores[i].score);
        var scoreItem = document.createElement('li');
        var text = newScore;
        scoreItem.textContent = text;
        scoreList.appendChild(scoreItem);
    } 
}

// function to clear high scores
function clearLocal() {
    window.localStorage.clear();
    LocalHighScores = [];

    while(scoreList.firstChild){
        scoreList.removeChild(scoreList.firstChild);
      }
}