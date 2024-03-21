// global variable
// static variables
let gameScore = 0;

// elements
const stageElement = document.getElementById("stage");
const butSurfaceElement = document.getElementById("but-surface");
const interceptorElement = document.getElementById("interceptor");
const gameScoreElement = document.getElementById("game-score");

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

const updateScore = () => {
  gameScoreElement.textContent = gameScore;
};
// utils functions
const randomGeneration = (speed) => Math.random() * speed + Math.random();

const speedForBallX = randomGeneration(2);
const speedForBallY = randomGeneration(6);

document.addEventListener("keydown", (e) => {
  const interceptorStyleLeft = interceptorStyle.getPropertyValue("left");
  let interceptorStyleLeftRealTime = parseInt(interceptorStyleLeft);
  if (e.key == "ArrowLeft" && interceptorStyleLeftRealTime - 10 >= 0) {
    e.preventDefault();
    interceptorElement.style.left =
      parseInt(interceptorElement.style.left || interceptorStyleLeft) -
      10 +
      "px";
  }
  if (
    e.key == "ArrowRight" &&
    interceptorStyleLeftRealTime + 10 <= stageWidth - interceptorWidth
  ) {
    e.preventDefault();
    interceptorElement.style.left =
      parseInt(interceptorElement.style.left || interceptorStyleLeft) +
      10 +
      "px";
  }
});

const moveBall = (ballSpeedX, ballSpeedY) => {
  ballElement = document.querySelector(".ball");

  let ballPosX = parseFloat(ballElement.style.left) || 0;
  let ballPosY = parseFloat(ballElement.style.top) || 0;


  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  // Reverse the direction of the ball when it hits the edge of the stage

  if (ballPosX <= 0 || ballPosX >= stageWidth - ballWidth) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballPosY <= 0 || ballPosY >= stageHeight - ballHeight) {
    ballSpeedY = -ballSpeedY;
  }

  if (
    ballPosY + ballHeight >= interceptorTop &&
    ballPosY <= interceptorTop + interceptorHeight &&
    ballPosX + ballWidth >= interceptorElement.offsetLeft &&
    ballPosX <= interceptorElement.offsetLeft + interceptorWidth
  ) {
    ballSpeedY = -ballSpeedY;
    gameScore++;
    updateScore();
  }

  // score goal
  if (
    ballPosY + ballHeight >= butSurfaceTop &&
    ballPosY <= butSurfaceTop + butSurfaceHeight
  ) {
    ballElement.remove();
    return;
  }

  ballElement.style.left = ballPosX + "px";
  ballElement.style.top = ballPosY + "px";
  requestAnimationFrame(() => moveBall(ballSpeedX, ballSpeedY));
};

// start point of this app
moveBall(speedForBallX, speedForBallY);
