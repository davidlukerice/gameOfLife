/**
 * The model for each cell
 * @params {int} params.x
 * @params {int} params.y
 * @params {obj} params.color {r,g,b,a}
 * @params {Grid} params.grid
 */
function Cell(params) {
  var cell = this;
  cell.x = params.x;
  cell.y = params.y;
  cell.color = params.color;
  cell.live = false;
  cell.grid = params.grid;
  cell.aliveNeighborColors = null;
}

Cell.AGE_UNIT = 255 * 0.1;

// counts nearby living neighbors and stores their colors
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

/**
 * Update cell's live status and color based on their neighbors
 * @note Should be called after all cells are 'examined'
 */
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
    cell.inheritColorFromNeighbors();
  }
};

Cell.prototype.makeAlive = function() {
  this.live = true;
};

Cell.prototype.kill = function() {
  this.live = false;
};

/**
 * Gets color values from neighbors
 * @assume That there are only three alive neighbors
 */
Cell.prototype.inheritColorFromNeighbors = function() {
  var cell = this;
  cell.color.a = Cell.AGE_UNIT;
  // Pull color elements from parents
  // Backwards so can pop off in order of rgb
  var channels = ['b', 'g', 'r'];
  cell.aliveNeighborColors.forEach(function(color) {
    if (color) {
      var channel = channels.pop();
      cell.color[channel] = color[channel];
    }
  });
};


/**
 * Increment the age of the cell. Capped at max color value;
 */
Cell.prototype.age = function() {
  var newAge = this.color.a + Cell.AGE_UNIT;
  this.color.a = newAge > 255 ? 255 : newAge;
};

/**
 * @return {array} Neighbors starting on left and going in clockwise order
 */
Cell.prototype.getNeighbors = function() {
  var cell = this,
      grid = cell.grid,
      onTop = cell.y === 0,
      onBottom = cell.y === (grid.height - 1),
      onLeft = cell.x === 0,
      onRight = cell.x === (grid.width - 1);
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

/**
 * Traverses all 8 sides
 * @param  {Function} fn function(cell)
 */
Cell.prototype.traverseNearby = function (fn) {
  this.getNeighbors().forEach(function(neighbor) {
    if (neighbor)
      fn(neighbor);
  });
};

/**
 * Toggles whether the cell is alive or not
 */
Cell.prototype.toggle = function () {
  this.live = !this.live;
};

/**
 * @return {obj} A duplicate of the cell's color
 */
Cell.prototype.getColor = function() {
  return {
    r: this.color.r,
    g: this.color.g,
    b: this.color.b,
    a: this.color.a
  };
};
