/**
 * Conway's game of life
 * @param {int} gridWidth
 * @param {int} gridHeight
 */
function Conway(gridWidth, gridHeight) {
  var conway = this;
  conway.grid = new Grid(gridWidth, gridHeight);
  var controlsElem = document.getElementById('controls');
  var canvasElem = document.getElementById('canvas');
  conway.view = new View(controlsElem, canvasElem);
  conway.viewModel = new ViewModel(conway.view, conway.grid);
};
