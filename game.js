const game = document.getElementById("game");
const player = document.getElementById("player");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOver");
const restartBtn =
document.getElementById("restartBtn");
highScoreEl.textContent = highScore;
restartBtn.addEventListener("click", () => {
    location.reload();
});

const clouds = document.getElementById("clouds");
const mountains = document.getElementById("mountains");

let started = false;
let gameOver = false;

let score = 0;
let speed = 6;

let playerY = 60;
let velocity = 0;

const gravity = 0.7;
const jumpPower = 14;

let obstacles = [];
let coins = [];

let cloudX = 0;
let mountainX = 0;

let highScore =
parseInt(localStorage.getItem("runnerHighScore")) || 0;

highScoreEl.textContent = highScore;

/* ---------- Controls ---------- */

document.addEventListener("keydown",(e)=>{

    if(!started && e.code==="Space"){
        startGame();
        return;
    }

    if(e.code==="Space" && !gameOver){
        jump();
    }

   
});

function handleTap(){

    if(!started){
        startGame();
        return;
    }

    if(!gameOver){
        jump();
    }
}

document.addEventListener("touchstart",handleTap);
document.addEventListener("click",handleTap);

/* ---------- Game ---------- */

function startGame(){

    started = true;

    startScreen.style.display = "none";

    spawnObstacle();
    spawnCoin();

    requestAnimationFrame(update);
}

function jump(){

    if(playerY <= 60.5){

        velocity = jumpPower;

        createDust(100,270);
    }
}

function createDust(x,y){

    const dust = document.createElement("div");

    dust.className = "dust";

    dust.style.left = x + "px";
    dust.style.top = y + "px";

    game.appendChild(dust);

    setTimeout(()=>{
        dust.remove();
    },500);
}

function spawnObstacle(){

    if(gameOver) return;

    const obstacle = document.createElement("div");

    obstacle.className = "obstacle";

    const height = 40 + Math.random()*50;

    obstacle.style.height = height + "px";

    obstacle.style.left = game.offsetWidth + "px";

    game.appendChild(obstacle);

    obstacles.push({
        el:obstacle,
        x:game.offsetWidth
    });

    setTimeout(
        spawnObstacle,
        Math.random()*1200+1000
    );
}

function spawnCoin(){

    if(gameOver) return;

    const coin = document.createElement("div");

    coin.className = "coin";

    coin.style.left = game.offsetWidth + "px";

    coin.style.bottom =
    (120 + Math.random()*80) + "px";

    game.appendChild(coin);

    coins.push({
        el:coin,
        x:game.offsetWidth
    });

    setTimeout(spawnCoin,2500);
}

function update(){

    if(gameOver) return;

    score += 0.1;

    scoreEl.textContent =
    Math.floor(score);

    speed =
    6 + Math.floor(score/100);

    playerY += velocity;
    velocity -= gravity;

    if(playerY < 60){

        playerY = 60;
        velocity = 0;
    }

    player.style.bottom =
    playerY + "px";

    cloudX -= speed * 0.1;
    mountainX -= speed * 0.3;

    clouds.style.backgroundPositionX =
    cloudX + "px";

    mountains.style.backgroundPositionX =
    mountainX + "px";

    obstacles.forEach((obs,index)=>{

        obs.x -= speed;

        obs.el.style.left =
        obs.x + "px";

        const p =
        player.getBoundingClientRect();

        const o =
        obs.el.getBoundingClientRect();

        if(
            p.left < o.right &&
            p.right > o.left &&
            p.top < o.bottom &&
            p.bottom > o.top
        ){
            endGame();
        }

        if(obs.x < -50){

            obs.el.remove();

            obstacles.splice(index,1);
        }
    });

    coins.forEach((coin,index)=>{

        coin.x -= speed;

        coin.el.style.left =
        coin.x + "px";

        const p =
        player.getBoundingClientRect();

        const c =
        coin.el.getBoundingClientRect();

        if(
            p.left < c.right &&
            p.right > c.left &&
            p.top < c.bottom &&
            p.bottom > c.top
        ){

            score += 10;

            coin.el.remove();

            coins.splice(index,1);
        }

        if(coin.x < -30){

            coin.el.remove();

            coins.splice(index,1);
        }
    });

    requestAnimationFrame(update);
}

function endGame(){

    gameOver = true;

    game.classList.add("shake");

    if(score > highScore){

        localStorage.setItem(
            "runnerHighScore",
            Math.floor(score)
        );
    }
    if(gameOver && e.key.toLowerCase()==="r"){
    location.reload();
}

    setTimeout(()=>{

        gameOverScreen.style.display =
        "flex";

    },300);
}
