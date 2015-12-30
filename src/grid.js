// The Controller for our game;
function Grid(w, h) {
  var grid = this;
  grid.width = w;
  grid.height = h;

  // this is the Model, really
  grid.rows = null;

  // use this to initialize or reset the grid
  grid.reset = function () {
    var x, y, row;
    grid.rows = [];

    for (y = 0; y < h; y++) {
      row = [];
      for (x = 0; x < w; x++) {
        row.push(new Cell(x, y, grid));
      }
      grid.rows.push(row);
    }
  }

  // call it right away to initialize the grid
  grid.reset();

  // utility to run through all of the cells
  // in the grid's rows.
  grid.traverse = function (fn) {
    var x, y;
    var context = {
      stop: false
    };
    outer: for (y = 0; y < grid.height; y++) {
      for (x = 0; x < grid.width; x++) {
        fn(context, grid.rows[y][x], x, y);
        if (context.stop) {
          break outer;
        }
      }
    }
  }

  grid.step = function () {
    // first go trough and count live neighbors
    // *before* you update each cell.
    // Otherwise you'll ruin the live neighbor count
    // for the next one.
    grid.traverse(function (ctxt, cell) {
      cell.examine();
    });

    // *Now* let's update the cells life status.
    grid.traverse(function (ctxt, cell) {
      cell.update();
    });
  };
}
