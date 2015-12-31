// The Controller for our game
function Grid(w, h) {
  var grid = this;
  grid.width = w;
  grid.height = h;
  grid.running = false;
  grid.rows = null;

  /**
   * Change the grid size
   * @param {number} size.width (optional)
   * @param {number} size.height (optional)
   */
  grid.changeSize = function(size) {
    grid.width = size.width || grid.width;
    grid.height = size.height || grid.height;
    grid.reset();
  };

  // use this to initialize or reset the grid
  grid.reset = function () {
    var x, y, row;
    grid.rows = grid.rows || [];

    for (y = 0; y < grid.height; y++) {
      row = grid.rows[y] || [];

      // Add on any additional width sells
      for (x = row.length; x < grid.width; x++) {
        row.push(new Cell({
          x: x, y: y,
          color: {
            r: 255, g: 255, b: 255, a: 255
          },
          grid: grid
        }));
      }
      // Check if the width was reduced
      if (row.length > grid.width) {
        row.splice(grid.width);
      }

      grid.rows[y] = row;
    }

    // Check if the height was reduced
    if (grid.rows.length > grid.height) {
      grid.rows.splice(grid.height);
    }
  };

  // call it right away to initialize the grid
  grid.reset();

  // utility to run through all of the cells
  // in the grid's rows.
  grid.traverse = function (fn) {
    var x, y;
    outer: for (y = 0; y < grid.height; y++) {
      for (x = 0; x < grid.width; x++) {
        fn(grid.rows[y][x], x, y);
      }
    }
  };

  grid.step = function () {
    grid.traverse(function (cell) {
      cell.examine();
    });

    grid.traverse(function (cell) {
      cell.update();
    });
  };

  grid.clear = function() {
    grid.traverse(function(cell) {
      cell.live = false;
    });
  };
  grid.randomize = function() {
    grid.traverse(function(cell) {
      cell.live = Math.random() < 0.4;
      cell.color.r = Math.random() * 255;
      cell.color.g = Math.random() * 255;
      cell.color.b = Math.random() * 255;
      cell.color.a = 255 * 0.1;
    });
  };
}
