// ViewModel to do the binding
function ViewModel(view, grid) {
  var table = view.table;
  var speedRange = view.speedRange;
  var viewModel = this;

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: 255 * 0.1
    } : null;
  }

  viewModel.update = function () {
    var context = view.canvas.getContext('2d'),
        imageData, pixels,
        x, y, i, color;

    imageData = context.createImageData(grid.width, grid.height);
    pixels = imageData.data;
    grid.traverse(function (e, cell) {
      if (cell.live) {
        i = (cell.y * grid.width + cell.x) * 4;
        pixels[i+0] = cell.color.r; //red
        pixels[i+1] = cell.color.g; //green
        pixels[i+2] = cell.color.b; //blue
        pixels[i+3] = cell.color.a; //alpha
      }
    });

    context.putImageData(imageData, 0,0);
  };

  // update the grid, and then update the view
  viewModel.tick = function () {
    grid.step();
    viewModel.update();
  };

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
      setTimeout(fn, 1000 / 60);
    };

  // The animation loop
  var frame = 0;

  viewModel.animate = function () {
    var speed = +speedRange.max - +speedRange.value;
    var runStep = speed === 0 || speed < 180 && (frame++ % speed) === 0;
    if(grid.running && runStep) {
      viewModel.tick();
    }
    requestAnimationFrame(viewModel.animate);
  }
  requestAnimationFrame(viewModel.animate);

  // set up the bindings
  viewModel.init = function () {
    setupCanvashandlers();
    setupControlHandlers();
  };

  function setupCanvashandlers() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
    canvas.width = grid.width;
    canvas.height = grid.height;

    function getPos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: Math.floor((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
        y: Math.floor((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
      };
    }

    var mouseDown = false;
    canvas.onmousedown = function(evt) {
      mouseDown = true;
      var pos = getPos(canvas, evt);
      var cell = grid.rows[pos.y][pos.x];
      cell.toggle();
      cell.color = hexToRgb(view.colorInput.value)
      viewModel.update();
    };
    canvas.onmouseup = function(evt) {
      mouseDown = false;
    };
    canvas.onmousemove = function(evt) {
      if (!mouseDown) return;

      var pos = getPos(canvas, evt);
      var cell = grid.rows[pos.y][pos.x];
      cell.color = hexToRgb(view.colorInput.value);
      viewModel.update();

      // Only turn on the cell if it's dead
      if (!cell.live) {
        cell.toggle();
      }
    };
  }

  function setupControlHandlers() {
    view.widthRange.addEventListener('input', function() {
      var width = Number.parseInt(view.widthRange.value);
      grid.changeSize({
        width: width
      });
      view.canvas.width = width;
      viewModel.update();
    });
    view.heightRange.addEventListener('input', function() {
      var height = Number.parseInt(view.heightRange.value);
      grid.changeSize({
        height: height
      });
      view.canvas.height = height;
      viewModel.update();
    });
    view.stepButton.onclick = function() {
      viewModel.tick();
    };
  }

  viewModel.init();
}
