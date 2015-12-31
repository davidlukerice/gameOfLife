function View(controlsElem, canvasElem) {
  var view = this;
  view.stepButton = controlsElem.querySelector('#step');
  view.colorInput = controlsElem.querySelector('#color');
  view.speedRange = controlsElem.querySelector('#speed');
  view.widthRange = controlsElem.querySelector('#width');
  view.heightRange = controlsElem.querySelector('#height');
  view.canvas = canvasElem;
}
