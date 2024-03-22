/**
 *
 * @param {number} speed
 * @return {number}
 */
export const randomGeneration = (speed) =>
  Math.random() * speed + Math.random();

/**
 *
 * @param {string} tagName
 * @param {Object} attributes
 * @param {string} content
 * @return {HTMLElement}
 */
export const createElement = (tagName, attributes = {}, content = null) => {
  const element = document.createElement(tagName);

  if (content) element.innerText = content;

  for (const [attribute, value] of Object.entries(attributes)) {
    if (value != false && value != null) element.setAttribute(attribute, value);
  }

  return element;
};

// elements
export const stageElement = document.getElementById("stage");
export const butSurfaceElement = document.getElementById("but-surface");
export const interceptorElement = document.getElementById("interceptor");
export const gameScoreElement = document.getElementById("game-score");

export let ballElement = document.querySelector(".ball");

// styles of element
export const interceptorStyle = getComputedStyle(interceptorElement);
export const butSurfaceStyle = getComputedStyle(interceptorElement);
export const butSurfaceStyleTop = parseInt(
  butSurfaceStyle.getPropertyValue("top")
);

// offsets
export const stageHeight = stageElement.offsetHeight;
export const stageWidth = stageElement.offsetWidth;

export const butSurfaceTop = butSurfaceElement.offsetTop;
export const butSurfaceHeight = butSurfaceElement.offsetHeight;

export const interceptorWidth = interceptorElement.offsetWidth;
export const interceptorTop = interceptorElement.offsetTop;
export const interceptorHeight = interceptorElement.offsetHeight;

export const ballWidth = ballElement.offsetWidth;
export const ballHeight = ballElement.offsetHeight;

/**
 *
 * @param {number} ballPosX
 * @param {number} ballPosY
 * @returns {boolean}
 */
export const ballHitsTheInterceptor = (ballPosX, ballPosY) =>
  ballPosY + ballHeight >= interceptorTop &&
  ballPosY <= interceptorTop + interceptorHeight &&
  ballPosX + ballWidth >= interceptorElement.offsetLeft &&
  ballPosX <= interceptorElement.offsetLeft + interceptorWidth;

/**
 *
 * @param {number} ballPosX
 * @returns {boolean}
 */
export const ballHitsTheEdgeOfStageX = (ballPosX) =>
  ballPosX <= 0 || ballPosX >= stageWidth - ballWidth;

/**
 *
 * @param {number} ballPosY
 * @returns {boolean}
 */
export const ballHitsTheEdgeOfStageY = (ballPosY) =>
  ballPosY <= 0 || ballPosY >= stageHeight - ballHeight;

/**
 *
 * @param {number} ballPosY
 * @returns {boolean}
 */
export const isGoal = (ballPosY) =>
  ballPosY + ballHeight >= butSurfaceTop &&
  ballPosY <= butSurfaceTop + butSurfaceHeight;
