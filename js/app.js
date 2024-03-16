// global variable
// static variables
let counterBallCreated = 1;

// elements
const stageElement = document.getElementById("stage");
const butSurfaceElement = document.getElementById("but-surface");
const interceptorElement = document.getElementById("interceptor");
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

// utils functions
const randomGeneration = (speed) => Math.random() * speed;

const createNewBall = () => {
  const ballElement = document.createElement("div");
  ballElement.setAttribute("class", "ball");

  ballElement.style.left = "30px";
  ballElement.style.top = "30px";

  stageElement.appendChild(ballElement);
  counterBallCreated++;
  console.log(counterBallCreated);
  moveBall(randomGeneration(20), randomGeneration(10));
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
    createNewBall();
    return;
  }

  ballElement.style.left = ballPosX + "px";
  ballElement.style.top = ballPosY + "px";
  requestAnimationFrame(() => moveBall(ballSpeedX, ballSpeedY));
};

// start point of this app
moveBall(randomGeneration(20), randomGeneration(10));
