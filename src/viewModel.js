// ViewModel to do the binding
function ViewModel(view, grid) {
  var table = view.table;
  var speedRange = view.speedRange;
  var viewModel = this;

  viewModel.update = function () {
    var context = view.canvas.getContext('2d'),
        imageData, pixels,
        x, y, i, color;
        imageData = context.createImageData(grid.width, grid.height);
        pixels = imageData.data;
    grid.traverse(function (e, cell) {
      if (cell.live) {
        color = [0, 0, 0];
      } else {
        color = [255, 255, 255];
      }

      i = (cell.y * grid.width + cell.x) * 4;
      pixels[i+0] = color[0]; //red
      pixels[i+1] = color[1]; //green
      pixels[i+2] = color[2]; //blue
      pixels[i+3] = 255; //alpha
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
    // we'll let it play as fast as it likes for now,
    // even though there's more efficient ways to do this,
    // but we'll use the input speed to trottle how
    // often the grid updates.
    if(speed === 0 || speed < 180 && (frame++ % speed) === 0) {
      console.log(speed);
      viewModel.tick();
    }
    requestAnimationFrame(viewModel.animate);
  }
  requestAnimationFrame(viewModel.animate);

  // set up the bindings
  viewModel.init = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d')
    canvas.width = grid.width;
    canvas.height = grid.height;
    context.imageSmoothingEnabled = false;

    var toggleCell = function (cell) {
      return function (e) {
        cell.live = !cell.live;
      }
    };

    function getPos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
        y: Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
      };
    }

    var mouseDown = false;
    canvas.onmousedown = function(evt) {
      mouseDown = true;
      var pos = getPos(canvas, evt);
      var cell = grid.rows[pos.y][pos.x];
      cell.toggle();
      viewModel.update();
    };
    canvas.onmouseup = function(evt) {
      mouseDown = false;
    };
    canvas.onmousemove = function(evt) {
      if (!mouseDown) return;

      var pos = getPos(canvas, evt);
      var cell = grid.rows[pos.y][pos.x];
      cell.toggle();
      viewModel.update();
    };
  };

  viewModel.init();
}
