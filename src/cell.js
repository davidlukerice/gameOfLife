// The model for an individual cell
function Cell(params) {
  var cell = this;
  cell.x = params.x;
  cell.y = params.y;
  cell.color = params.color;
  cell.live = false;
  cell.grid = params.grid;
}

// counts nearby living neighbors
// and updates cell.liveNeighbors
Cell.prototype.examine = function () {
  var cell = this;
  cell.liveNeighbors = 0;

  cell.traverseNearby(function (ctxt, neighbor) {
    if (neighbor.live) {
      cell.liveNeighbors++;
    }
  });
};

// The actual, important logic for CGL is
// done here. Update the live status based
// on current status and living neighbor count.
Cell.prototype.update = function () {
  var cell = this,
    liveNeighbors = cell.liveNeighbors;

  if (cell.live) {
    if (liveNeighbors <= 1 || liveNeighbors >= 4) {
      cell.live = false;
    }
  } else if (liveNeighbors === 3) {
    cell.live = true;
  }
}

// A utility function to traverse the 8 nearby cells.
Cell.prototype.traverseNearby = function (fn) {
  var cell = this;
  var context = {
    stop: false
  };
  var grid = cell.grid;
  var x, y, n;
  outer: for (y = Math.max(0, cell.y - 1); y <= Math.min(grid.height - 1, cell.y + 1); y++) {
    for (x = Math.max(0, cell.x - 1); x <= Math.min(grid.width - 1, cell.x + 1); x++) {
      if (x !== cell.x || y !== cell.y) {
        var neighbor = grid.rows[y][x];
        fn(context, neighbor);
        if (context.stop) {
          break outer;
        }
      }
    }
  }
}

// toggles life status
Cell.prototype.toggle = function () {
  this.live = !this.live;
}
