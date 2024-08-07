//* ELEMENTOS PRINCIPALES

const startScreenNode = document.querySelector("#start-screen");
const rulesScreen = document.querySelector("#game-rules");
const gameScreenNode = document.querySelector("#game-screen");
const endScreenNode = document.querySelector("#game-over-screen");
const endScreenContentNode = document.querySelector("#final");
const scoreNode = document.querySelector("#score");
const scoreFinal = document.querySelector("#final-score");
const vidasNode = document.querySelector("#vidas");

// !BOTONES

const startBtn = document.querySelector("#start-btn");
const replayBtn = document.querySelector("#re-start");
const instruccionBtn = document.querySelector("#instrucciones");
const closeBtn = document.querySelector("#cerrar");

// !GAMEBOX

const gameBox = document.querySelector("#game-box");

//  VARIABLES GLOBALES

let honguitoObj = null;
let fallingArrGood = [];
let fallingArrBad = [];
let pillsArr = [];

let mainIntervalID = null;
let goodObjIntervalId = null;
let badObjIntervalId = null;
let walkingIntervalId = null;

let audio = new Audio("./images/musica_fondo.mp3");
audio.volume = 0.05;
let audio2 = new Audio(
  "./images/mixkit-player-jumping-in-a-video-game-2043.wav"
);
audio2.volume = 0.1;

//* FUNCIONES GLOBALES DEL JUEGO

function startGame() {
  startScreenNode.style.display = "none";
  rulesScreen.style.display = "none";
  gameScreenNode.style.display = "flex";
  endScreenNode.style.display = "none";

  honguitoObj = new Honguito();

  audio.loop = true;
  audio.play();

  fallingArrGood = [];
  fallingArrBad = [];

  mainIntervalID = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));

  goodObjIntervalId = setInterval(() => {
    goodObjAppear();
  }, Math.random() * 1000 + 1000);

  badObjIntervalId = setInterval(() => {
    badObjAppear();
  }, Math.random() * 500 + 500);

  walkingIntervalId = setInterval(() => {
    honguitoObj.changeImage();
  }, 150);
}

function gameLoop() {
  fallingArrGood.forEach((eachObj) => {
    eachObj.automaticMovement();
  });
  fallingArrBad.forEach((eachObj) => {
    eachObj.automaticMovement();
  });
  pillsArr.forEach((eachPill) => {
    eachPill.automaticMovement();
  });

  colisionHonguitoObjBad();
  colisionHonguitoObjGood();
  colisionPillsObjBad();
}

function goodObjAppear() {
  let randomX = Math.floor(Math.random() * gameBox.offsetWidth);
  let randomImage = Math.round(Math.random());
  let image = "";
  if (randomImage === 0) {
    image = "beer";
  } else {
    image = "wine";
  }

  let goodObj = new FallingObjGood(randomX, image);
  fallingArrGood.push(goodObj);
}

function badObjAppear() {
  let randomX = Math.floor(Math.random() * gameBox.offsetWidth);
  let randomImage = Math.round(Math.random());
  let image = "";
  if (randomImage === 0) {
    image = "cheese";
  } else {
    image = "milk";
  }
  let badObj = new FallingObjBad(randomX, image);
  fallingArrBad.push(badObj);
}
function pillAppear() {
  let pillObj = new ShootPills(honguitoObj.x + honguitoObj.w / 2);
  pillsArr.push(pillObj);
  audio2.currentTime = 0;
  audio2.pause();
  audio2.play();
}

function colisionHonguitoObjBad() {
  fallingArrBad.forEach((eachBadObj, index) => {
    if (
      eachBadObj.x < honguitoObj.x + honguitoObj.w &&
      eachBadObj.x + eachBadObj.w > honguitoObj.x &&
      eachBadObj.y < honguitoObj.y + honguitoObj.h &&
      eachBadObj.y + eachBadObj.h > honguitoObj.y
    ) {
      fallingArrBad.splice(index, 1);
      eachBadObj.node.remove();

      if (honguitoObj.vida === 3) {
        honguitoObj.vida -= 1;
        vidasNode.innerText = "💨💨";
      } else if (honguitoObj.vida === 2) {
        honguitoObj.vida -= 1;
        vidasNode.innerText = "💨";
      } else if (honguitoObj.vida === 1) {
        gameOver();
      }
    }
  });
}

function colisionPillsObjBad() {
  // hacer que cada pill colisione con un queso o leche (las dos son arrays)

  pillsArr.forEach((eachPill, indexPill) => {
    fallingArrBad.forEach((eachBadObj, indexBadObj) => {
      if (
        eachPill.x < eachBadObj.x + eachBadObj.w &&
        eachPill.x + eachPill.w > eachBadObj.x &&
        eachPill.y < eachBadObj.y + eachBadObj.h &&
        eachPill.y + eachPill.h > eachBadObj.y
      ) {
        fallingArrBad.splice(indexBadObj, 1);
        eachBadObj.node.remove();
        pillsArr.splice(indexPill, 1);
        eachPill.node.remove();
      }
    });
  });
}

function colisionHonguitoObjGood() {
  // si te toca una cerveza, ganas puntos

  fallingArrGood.forEach((eachGoodObj, index) => {
    if (
      eachGoodObj.x < honguitoObj.x + honguitoObj.w &&
      eachGoodObj.x + eachGoodObj.w > honguitoObj.x &&
      eachGoodObj.y < honguitoObj.y + honguitoObj.h &&
      eachGoodObj.y + eachGoodObj.h > honguitoObj.y
    ) {
      let objColisionado = fallingArrGood[index];
      fallingArrGood.splice(index, 1);
      objColisionado.node.remove();
      scoreNode.innerText++;
    }
  });
}

function gameOver() {
  clearInterval(mainIntervalID);
  clearInterval(goodObjIntervalId);
  clearInterval(badObjIntervalId);

  honguitoObj.node.remove();
  let puntuacion = scoreNode.innerText;
  scoreFinal.innerText = puntuacion;
  gameBox.innerHTML = null;
  audio.loop = false;
  audio.pause();
  audio2.pause();

  gameScreenNode.style.display = "none";
  endScreenNode.style.display = "flex";
}

function reStartGame() {
  startScreenNode.style.display = "flex";
  endScreenNode.style.display = "none";
  scoreNode.innerText = 0;
  vidasNode.innerText = "💨💨💨";
}

//* EVENT LISTENERS

startBtn.addEventListener("click", () => {
  startGame();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    honguitoObj.movement("right");
  } else if (event.key === "ArrowLeft") {
    honguitoObj.movement("left");
  }
});

replayBtn.addEventListener("click", () => {
  reStartGame();
});

instruccionBtn.addEventListener("click", () => {
  rulesScreen.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  rulesScreen.style.display = "none";
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    pillAppear();
  }
});
