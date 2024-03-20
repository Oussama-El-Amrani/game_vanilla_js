// global variable
// static variables
let counterBallCreated = 1;
let gameScore = 0;
let startTime = 0;
let scoreInterval;

// elements
const stageElement = document.getElementById("stage");
const butSurfaceElement = document.getElementById("but-surface");
const interceptorElement = document.getElementById("interceptor");
const infoBarElement = document.getElementById("info-bar");
const gameScoreElement = document.getElementById("game-score");
const ballCreatedCounterElement = document.getElementById(
  "ball-created-counter"
);
let ballElement = document.querySelector(".ball");

// styles of element
const interceptorStyle = getComputedStyle(interceptorElement);
const butSurfaceStyle = getComputedStyle(interceptorElement);
const butSurfaceStyleTop = parseInt(butSurfaceStyle.getPropertyValue("top"));

// offsets
const stageHeight = stageElement.offsetHeight;
const stageWidth = stageElement.offsetWidth;

const butSurfaceTop = butSurfaceElement.offsetTop;
const butSurfaceHeight = butSurfaceElement.offsetHeight;

const interceptorWidth = interceptorElement.offsetWidth;
const interceptorTop = interceptorElement.offsetTop;
const interceptorHeight = interceptorElement.offsetHeight;

const ballWidth = ballElement.offsetWidth;
const ballHeight = ballElement.offsetHeight;

const updateInfoBar = () => {
  gameScoreElement.textContent = gameScore;
  ballCreatedCounterElement.textContent = counterBallCreated;
};
// utils functions
const randomGeneration = (speed) => Math.random() * speed + Math.random();

const speedForBallX = randomGeneration(2);
const speedForBallY = randomGeneration(6);

const createNewBall = () => {
  updateInfoBar();
  const ballElement = document.createElement("div");
  ballElement.setAttribute("class", "ball");

  ballElement.style.left = "30px";
  ballElement.style.top = "30px";

  stageElement.appendChild(ballElement);
  counterBallCreated++;
  startTime = Date.now();
  console.log(counterBallCreated);
  moveBall(speedForBallX, speedForBallY);

  //dlete this
  gameScore = 0;
  scoreInterval = setInterval(() => {
    gameScore += 10;
    updateInfoBar();
  }, 1000);
};

const showModal = (score) => {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <p>Votre score est de ${score}. Il sera déduit de 1000.</p>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
};

// event trigger functions
document.addEventListener("keydown", (e) => {
  const interceptorStyleLeft = interceptorStyle.getPropertyValue("left");
  //   debugger;
  let interceptorStyleLeftRealTime = parseInt(interceptorStyleLeft);
  if (e.key == "ArrowLeft" && interceptorStyleLeftRealTime - 10 >= 0) {
    e.preventDefault();
    // console.log("ksskss", interceptorStyleLeftRealTime);
    interceptorElement.style.left =
      parseInt(interceptorElement.style.left || interceptorStyleLeft) -
      10 +
      "px";
    // console.log(interceptorElement.style.left);
  }
  //   console.log("stage offset", stageElement.offsetWidth);
  if (
    e.key == "ArrowRight" &&
    interceptorStyleLeftRealTime + 10 <= stageWidth - interceptorWidth
  ) {
    e.preventDefault();
    // console.log(interceptorElement.style.left);
    interceptorElement.style.left =
      parseInt(interceptorElement.style.left || interceptorStyleLeft) +
      10 +
      "px";
    // console.log(interceptorElement.style.left);

    // console.log("ArrowRight");
  }
});

const moveBall = (ballSpeedX, ballSpeedY) => {
  ballElement = document.querySelector(".ball");

  let ballPosX = parseFloat(ballElement.style.left) || 0;
  let ballPosY = parseFloat(ballElement.style.top) || 0;

  let interceptorPosX = parseFloat(interceptorElement.style.left) || 0;
  let interceptorPosY = parseFloat(interceptorElement.style.top) || 0;

  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  // Reverse the direction of the ball when it hits the edge of the stage

  if (ballPosX <= 0 || ballPosX >= stageWidth - ballWidth) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballPosY <= 0 || ballPosY >= stageHeight - ballHeight) {
    ballSpeedY = -ballSpeedY;
  }

  //   console.log(
  //     "xi barakaa ",
  //     butSurfaceTop + butSurfaceHeight + interceptorHeight
  //   );
  //   console.log("xi barakaa dtalhom", posY + ballHeight);
  console.log(interceptorElement.style.left);
  console.log("interceptorWidth", interceptorWidth);

  if (
    ballPosY + ballHeight >= interceptorTop &&
    ballPosY <= interceptorTop + interceptorHeight &&
    ballPosX + ballWidth >= interceptorElement.offsetLeft &&
    ballPosX <= interceptorElement.offsetLeft + interceptorWidth
  ) {
    ballSpeedY = -ballSpeedY;
  }

  // score goal
  if (
    ballPosY + ballHeight >= butSurfaceTop &&
    ballPosY <= butSurfaceTop + butSurfaceHeight
  ) {
    ballElement.remove();

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    const scoreIncrement = (elapsedTime / 1000) * 10;
    gameScore += scoreIncrement;

    updateInfoBar();

    setTimeout(() => {

      const modal = showModal(gameScore);
      setTimeout(() => {
        modal.remove();
      }, 1000);

      gameScore -= 1000;
      createNewBall();
    }, 1000);
    return;
  }

  ballElement.style.left = ballPosX + "px";
  ballElement.style.top = ballPosY + "px";
  requestAnimationFrame(() => moveBall(ballSpeedX, ballSpeedY));
};

// start point of this app
moveBall(speedForBallX, speedForBallY);
