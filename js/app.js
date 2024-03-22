import {
  createBallComponent,
  createNumberShotsComponent,
  createRetryButtonComponent,
} from "./components.js";
import {
  ballElement,
  ballHitsTheEdgeOfStageX,
  ballHitsTheEdgeOfStageY,
  ballHitsTheInterceptor,
  gameScoreElement,
  interceptorElement,
  interceptorStyle,
  interceptorWidth,
  isGoal,
  randomGeneration,
  stageElement,
  stageWidth,
} from "./utils.js";

// static variables
let gameScore = 0;
let ballElement_ = ballElement;

const updateScore = () => {
  gameScoreElement.textContent = gameScore;
};

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
  ballElement_ = document.querySelector(".ball");

  let ballPosX = parseFloat(ballElement_.style.left) || 0;
  let ballPosY = parseFloat(ballElement_.style.top) || 0;

  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  // Reverse the direction of the ball when it hits the edge of the stage

  if (ballHitsTheEdgeOfStageX(ballPosX)) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballHitsTheEdgeOfStageY(ballPosY)) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballHitsTheInterceptor(ballPosX, ballPosY)) {
    ballSpeedY = -ballSpeedY;
    gameScore++;
    updateScore();
  }

  // score goal
  if (isGoal(ballPosY)) {
    ballElement_.remove();
    gameOver();
    return;
  }

  ballElement_.style.left = ballPosX + "px";
  ballElement_.style.top = ballPosY + "px";
  requestAnimationFrame(() => moveBall(ballSpeedX, ballSpeedY));
};

// start point of this app
moveBall(speedForBallX, speedForBallY);

const gameOver = () => {
  gameScoreElement.hidden = true;

  const shotsElement = createNumberShotsComponent(stageElement, gameScore);

  gameScore = 0;
  updateScore();

  interceptorElement.hidden = true;

  const retryButton = createRetryButtonComponent(stageElement);
  retryButton.addEventListener("click", () => {
    restartGame(retryButton, shotsElement);
  });
};

/**
 *
 * @param {HTMLElement} buttonElement
 * @param {HTMLElement} numberShotsElement
 */
const restartGame = (buttonElement, numberShotsElement) => {
  buttonElement.remove();
  numberShotsElement.remove();
  gameScoreElement.hidden = false;
  interceptorElement.hidden = false;
  createBallComponent(stageElement);
  moveBall(speedForBallX, speedForBallY);
};
