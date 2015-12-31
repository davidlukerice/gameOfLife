/**
 * Model for the game board and necessary logic to simulate the game
 * @param {int} w
 * @param {int} h
 */
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

  /**
   * Initialize the correct number of cells and rows.
   * Shrinks or grows the grid according to current width/height
   */
  grid.reset = function () {
    var x, y, row;
    grid.rows = grid.rows || [];

    for (y = 0; y < grid.height; y++) {
      row = grid.rows[y] || [];

      // Add on any additional width cells
      for (x = row.length; x < grid.width; x++) {
        row.push(new Cell({
          x: x, y: y,
          color: {
            r: 255, g: 255, b: 255, a: 255
          },
          grid: grid
        }));
      }
      // Check if any cells outside the width need to be removed
      if (row.length > grid.width) {
        row.splice(grid.width);
      }

      grid.rows[y] = row;
    }

    // Check if any cells outside the height need to be removed
    if (grid.rows.length > grid.height) {
      grid.rows.splice(grid.height);
    }
  };

  // call it right away to initialize the grid
  grid.reset();

  /**
   * Utility to run through all of the cells
   * @param  {Function} fn function(Cell, x, y)
   */
  grid.traverse = function (fn) {
    var x, y;
    for (y = 0; y < grid.height; y++) {
      for (x = 0; x < grid.width; x++) {
        fn(grid.rows[y][x], x, y);
      }
    }
  };

  /**
   * Simulates a single step in the game
   * @return {[type]} [description]
   */
  grid.step = function () {
    grid.traverse(function (cell) {
      cell.examine();
    });

    grid.traverse(function (cell) {
      cell.update();
    });
  };

  /**
   * Kills off all cells
   */
  grid.clear = function() {
    grid.traverse(function(cell) {
      cell.live = false;
    });
  };

  /**
   * Randomly turns on cells and changes their color
   */
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
