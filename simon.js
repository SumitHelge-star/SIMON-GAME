let gameseq = [];
let userseq = [];
let started = false;
let level = 0;

let btns = ["red", "green", "orange", "blue"];
let h5 = document.querySelector("h5");

// Start game
document.addEventListener("keydown", () => {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Flash effects
function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(() => btn.classList.remove("gameflash"), 300);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 200);
}

// Level up (FULL sequence replay ✅)
function levelUp() {
    userseq = [];
    level++;
    h5.innerText = `Level ${level}`;

    let randIndex = Math.floor(Math.random() * 4);
    let randColor = btns[randIndex];
    gameseq.push(randColor);

    let delay = 0;
    for (let color of gameseq) {
        let btn = document.querySelector(`#${color}`);
        setTimeout(() => gameFlash(btn), delay);
        delay += 600;
    }
}

// Button press
function buttonPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAnswer(userseq.length - 1);
}

// Check answer
function checkAnswer(index) {
    if (userseq[index] === gameseq[index]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h5.innerHTML = `Game Over! Your Score: <b>${level}</b><br>Press Any Key to Restart`;
        document.body.style.backgroundColor = "red";

        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 300);

        resetGame();
    }
}

// Reset
function resetGame() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

// Event listeners
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", buttonPress);
}
