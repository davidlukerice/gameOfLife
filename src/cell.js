// The model for an individual cell
function Cell(params) {
  var cell = this;
  cell.x = params.x;
  cell.y = params.y;
  cell.color = params.color;
  cell.live = false;
  cell.grid = params.grid;
  cell.aliveNeighborColors = null;
}

// counts nearby living neighbors
// and updates cell.liveNeighbors
Cell.prototype.examine = function () {
  var cell = this;
  cell.liveNeighbors = 0;
  cell.aliveNeighborColors = cell.getNeighbors().map(function(neighbor) {
    return (neighbor && neighbor.live) ? neighbor.getColor() : null;
  });
  cell.traverseNearby(function (neighbor) {
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
      cell.kill();
    }
    else {
      cell.age();
    }
  } else if (liveNeighbors === 3) {
    cell.makeAlive();
  }
};

/**
 * Turns back on a cell
 * @assume That there are only three alive neighbors
 */
Cell.prototype.makeAlive = function() {
  var cell = this;
  cell.live = true;
  cell.color.a = 255 * 0.1;

  // Pull color elements from parents
  // Backwards so can pop off in order
  var channels = ['b', 'g', 'r'];
  cell.aliveNeighborColors.forEach(function(color) {
    if (color) {
      var channel = channels.pop();
      cell.color[channel] = color[channel];
    }
  });
};

Cell.prototype.kill = function() {
  this.live = false;
};

Cell.prototype.age = function() {
  var newAge = this.color.a + 255 * 0.1;
  this.color.a = newAge > 255 ? 255 : newAge;
};

Cell.prototype.getNeighbors = function() {
  var cell = this,
      grid = cell.grid,
      onTop = cell.y === 0,
      onBottom = cell.y === (grid.height - 1),
      onLeft = cell.x === 0,
      onRight = cell.x === (grid.width - 1);
  // Returned neighbors start on the left and moving clockwise
  return [
    (onLeft             ) ? null : grid.rows[cell.y    ][cell.x - 1],
    (onLeft || onTop    ) ? null : grid.rows[cell.y - 1][cell.x - 1],
    (onTop              ) ? null : grid.rows[cell.y - 1][cell.x    ],
    (onRight || onTop   ) ? null : grid.rows[cell.y - 1][cell.x + 1],
    (onRight            ) ? null : grid.rows[cell.y    ][cell.x + 1],
    (onBottom || onRight) ? null : grid.rows[cell.y + 1][cell.x + 1],
    (onBottom           ) ? null : grid.rows[cell.y + 1][cell.x    ],
    (onBottom || onLeft ) ? null : grid.rows[cell.y + 1][cell.x - 1]
  ];
};

// A utility function to traverse the 8 nearby cells.
Cell.prototype.traverseNearby = function (fn) {
  this.getNeighbors().forEach(function(neighbor) {
    if (neighbor)
      fn(neighbor);
  });
};

// toggles life status
Cell.prototype.toggle = function () {
  this.live = !this.live;
};

Cell.prototype.getColor = function() {
  return {
    r: this.color.r,
    g: this.color.g,
    b: this.color.b,
    a: this.color.a
  };
};
