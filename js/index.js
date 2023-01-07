

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const warning = document.getElementById('warning');
const selectScore =  document.getElementById("score");
const SCREEN_SIZE = 400;
const GUTTER = 20;
const SPEED = 200;
let snakePositionX = 80;
let snakePositionY = 80;
let movingPositionX = 0;
let movingPositionY = 0;
let fruitPositionX = 100;
let fruitPositionY = 100;
let snakeTail = [];
let snakeSize = 1;
var score = 0;
let game;



const mainGame = () => {
    
    selectScore.innerHTML = score;
    snakePositionX += movingPositionX;
    snakePositionY += movingPositionY;

    snakePositionX > SCREEN_SIZE - GUTTER && (snakePositionX = 0);
    snakePositionY > SCREEN_SIZE - GUTTER && (snakePositionY = 0);
    snakePositionX < 0 && (snakePositionX = SCREEN_SIZE);
    snakePositionY < 0 && (snakePositionY = SCREEN_SIZE);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);

    ctx.strokeStyle = "#333";
    ctx.stroke()

    ctx.fillStyle = "#00f";
    ctx.fillRect(snakePositionX, snakePositionY, GUTTER, GUTTER)

    for (let snake = 0; snake < snakeTail.length; snake++) {
        ctx.fillRect(snakeTail[snake].x, snakeTail[snake].y, GUTTER, GUTTER)
        if (snakePositionX === snakeTail[snake].x &&
            snakePositionY === snakeTail[snake].y && snake > 1 ) {
                 clearInterval(game);
                warning.innerHTML = `Game over Pleas restart the game`;
                selectScore.classList.add('error');
        }
           
    }

    ctx.fillStyle = "#0f0";
    ctx.fillRect(fruitPositionX, fruitPositionY, GUTTER, GUTTER);

    if (fruitPositionX === snakePositionX && fruitPositionY === snakePositionY) {
        fruitPositionX = Math.floor(Math.random() * 20) * 20
        fruitPositionY = Math.floor(Math.random() * 20) * 20
        snakeSize++;
        selectScore.classList.add('scale');
        score += 10;
        setTimeout(() => {
            selectScore.classList.remove('scale');
        }, 100);
    }

    snakeTail.push({ x: snakePositionX, y: snakePositionY })
    while (snakeTail.length >= snakeSize) { snakeTail.shift() };

}

let oldKey;
const handleInput = ({ keyCode }) => {

    keyCode !== 40  &&  keyCode !== 39 &&
    keyCode !== 38 && keyCode !== 37 &&
    movingPositionX === 0 && movingPositionY === 0 ?
    (warning.innerHTML = `Please press arrow keys to start`):
    (warning.innerHTML = ``);
    if (keyCode !== oldKey) {
        if ((keyCode === 38 && oldKey !== 40) ||
            (keyCode === 40 && oldKey !== 38) ||
            (keyCode === 39 && oldKey !== 37) ||
            (keyCode === 37 && oldKey !== 39)) {
            switch (keyCode) {
                case 38:
                    movingPositionY -= (
                        Math.abs(movingPositionY) === GUTTER ?
                            GUTTER * 2 :
                            GUTTER
                    );
                    movingPositionX = 0;
                    break;
                case 40:
                    movingPositionY += (
                        Math.abs(movingPositionY) === GUTTER ?
                            GUTTER * 2 :
                            GUTTER
                    );
                    movingPositionX = 0;
                    break;
                case 39:
                    movingPositionX += (
                        Math.abs(movingPositionX) === GUTTER ?
                            GUTTER * 2 :
                            GUTTER
                    );
                    movingPositionY = 0;
                    break;
                case 37:
                    movingPositionX -= (
                        Math.abs(movingPositionX) === GUTTER ?
                            GUTTER * 2 :
                            GUTTER
                    );
                    movingPositionY = 0;
            }
        }
    }

    oldKey = keyCode;

}


window.onload = () => {
    document.addEventListener('keydown', handleInput)
    game = setInterval(() => mainGame(), SPEED);
};
