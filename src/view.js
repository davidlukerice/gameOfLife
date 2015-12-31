/**
 * Stores view elements
 * @param {htmlElement} controlsElem
 * @param {htmlCanvas} canvasElem
 */
function View(controlsElem, canvasElem) {
  var view = this;
  view.playButton = controlsElem.querySelector('#play');
  view.stepButton = controlsElem.querySelector('#step');
  view.clearButton = controlsElem.querySelector('#clear');
  view.randButton = controlsElem.querySelector('#rand');
  view.penColorInput = controlsElem.querySelector('#penColor');
  view.penSizeRange = controlsElem.querySelector('#penSize');
  view.speedRange = controlsElem.querySelector('#speed');
  view.widthRange = controlsElem.querySelector('#width');
  view.heightRange = controlsElem.querySelector('#height');
  view.canvas = canvasElem;
}
