const game = document.getElementById("game");
const player = document.getElementById("player");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");

let started = false;
let gameOver = false;

let score = 0;
let speed = 6;

let playerY = 60;
let velocity = 0;

const gravity = 0.7;
const jumpPower = 14;

let obstacles = [];

let highScore =
parseInt(localStorage.getItem("runnerHighScore")) || 0;

highScoreEl.textContent = highScore;

restartBtn.addEventListener("click", () => {
location.reload();
});

document.addEventListener("keydown", (e) => {

```
if (!started && e.code === "Space") {
    startGame();
    return;
}

if (!gameOver && e.code === "Space") {
    jump();
}
```

});

function handleTap() {

```
if (!started) {
    startGame();
    return;
}

if (!gameOver) {
    jump();
}
```

}

document.addEventListener("touchstart", handleTap);
document.addEventListener("click", handleTap);

function startGame() {

```
started = true;

startScreen.style.display = "none";

spawnObstacle();

requestAnimationFrame(update);
```

}

function jump() {

```
if (playerY <= 60.5) {
    velocity = jumpPower;
}
```

}

function spawnObstacle() {

```
if (gameOver) return;

const obstacle =
document.createElement("div");

obstacle.className = "obstacle";

obstacle.style.height =
(40 + Math.random() * 50) + "px";

obstacle.style.left =
game.offsetWidth + "px";

game.appendChild(obstacle);

obstacles.push({
    el: obstacle,
    x: game.offsetWidth
});

setTimeout(
    spawnObstacle,
    Math.random() * 1200 + 1000
);
```

}

function update() {

```
if (gameOver) return;

score += 0.1;

scoreEl.textContent =
Math.floor(score);

speed =
6 + Math.floor(score / 100);

playerY += velocity;
velocity -= gravity;

if (playerY < 60) {
    playerY = 60;
    velocity = 0;
}

player.style.bottom =
playerY + "px";

obstacles.forEach((obs, index) => {

    obs.x -= speed;

    obs.el.style.left =
    obs.x + "px";

    const p =
    player.getBoundingClientRect();

    const o =
    obs.el.getBoundingClientRect();

    if (
        p.left < o.right &&
        p.right > o.left &&
        p.top < o.bottom &&
        p.bottom > o.top
    ) {
        endGame();
    }

    if (obs.x < -50) {

        obs.el.remove();

        obstacles.splice(index, 1);
    }
});

requestAnimationFrame(update);
```

}

function endGame() {

```
gameOver = true;

game.classList.add("shake");

if (score > highScore) {

    localStorage.setItem(
        "runnerHighScore",
        Math.floor(score)
    );
}

setTimeout(() => {

    gameOverScreen.style.display =
    "flex";

}, 300);
```

}
