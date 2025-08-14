let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

document.addEventListener("keydown", function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        animateUserPress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animateSystemFlash(randomChosenColor);
}

function animateUserPress(color) {
    let activeButton = document.getElementById(color);
    activeButton.classList.add("user-pressed");
    setTimeout(() => {
        activeButton.classList.remove("user-pressed");
    }, 200);
}

function animateSystemFlash(color) {
    let activeButton = document.getElementById(color);
    activeButton.classList.add("system-flash");
    setTimeout(() => {
        activeButton.classList.remove("system-flash");
    }, 300);
}

function gameOver() {
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = `Game Over! Final Score: Level ${level} — Press Any Key to Restart`;
    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 200);
    startOver();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
