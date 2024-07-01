// * PLANIFICACION
// ? AÑADIR CARPETA DE ELEMENTOS IMG
// ? CREAR CLASES DEL JUEGO
// ? CREAR EL GAME LOOP

//* ELEMENTOS PRINCIPALES DEL DOM

const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const endScreenNode = document.querySelector("#game-over-screen");

// !BOTONES

const startBtn = document.querySelector("#start-btn");
const replayBtn = document.querySelector("#re-start");

// !GAMEBOX

const gameBox = document.querySelector("#game-box");

//  VARIABLES GLOBALES

let honguitoObj = null;
let fallingArrGood = [];
let fallingArrBad = [];

let mainIntervalID = null;
let goodObjIntervalId = null;
let badObjIntervalId = null;

//* FUNCIONES GLOBALES DEL JUEGO

function startGame() {
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  endScreenNode.style.display = "none";

  honguitoObj = new Honguito();

  mainIntervalID = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));

  goodObjIntervalId = setInterval(() => {
    goodObjAppear();
  }, Math.random() * 1000 + 1000);

  badObjIntervalId = setInterval(() => {
    badObjAppear();
  }, Math.random() * 500 + 500);
}

function gameLoop() {
  fallingArrGood.forEach((eachObj) => {
    eachObj.automaticMovement();
  });
  fallingArrBad.forEach((eachObj) => {
    eachObj.automaticMovement();
  });
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

function colisonHonguitoObjBad() {
  // si te toca una leche o un quesito mueres
  //sonido de pedito cuando te cae uno encima
  //el objeto debe desaparecer
}

function colisonHonguitoObjGood() {
  // si te toca una cerveza, o vino aumenta tu vida.
  // los objetos una vez que te toquen deben desaparecer
  // debe haber una barra que muestre la vida
}

function gameOver() {
  clearInterval(mainIntervalID);
  clearInterval(goodObjIntervalId);
  clearInterval(badObjIntervalId);

  gameScreenNode.style.display = "none";
  endScreenNode.style.display = "flex";
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
