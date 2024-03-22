import { createElement } from "./utils.js";

/**
 *
 * @param {HTMLElement} hostElement
 * @param {number} score
 */
export const createNumberShotsComponent = (hostElement, score) => {
  const element = createElement("div", { id: "number-shots" });
  element.textContent = `number of shots is ${score}`;
  hostElement.appendChild(element);

  return element;
};

/**
 *
 * @param {HTMLElement} hostElement
 * @param {number} score
 * @returns {HTMLButtonElement}
 */
export const createRetryButtonComponent = (hostElement) => {
  const element = createElement("button", { id: "retry-button" });
  element.textContent = "Retry";

  hostElement.appendChild(element);

  return element;
};

/**
 *
 * @param {HTMLElement} hostElement
 * @returns
 */
export const createBallComponent = (hostElement) => {
  const element = createElement("div", { class: "ball" });

  element.style.left = "30px";
  element.style.top = "30px";

  hostElement.appendChild(element);

  return element;
};
