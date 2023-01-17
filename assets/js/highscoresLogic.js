var scoreList = document.querySelector("#highscores");
var LocalHighScores = JSON.parse(localStorage.getItem('high scores'));
if (LocalHighScores === null) {
    LocalHighScores = [];
}

document.getElementById('clear').addEventListener("click", clearLocal);

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

function clearLocal() {
    window.localStorage.clear();
    LocalHighScores = [];

    while(scoreList.firstChild){
        scoreList.removeChild(scoreList.firstChild);
      }
}