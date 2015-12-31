For the purposes of this project we will use this one http://jsfiddle.net/blesh/n9S8R/light/ as an example.

Challenge:
  - [x] Conway’s standard set of 4 rules:
    1. < 2 live neighbors dies
    2. 2 or 3 live neighbors lives
    3. > 3 live neighbors dies
    4. dead cell === 3 live neighbors becomes a live cell
  - [x] User can define the height and width
  - [ ] Color
    - [x] Color picker for initial value
    - [ ] Inherit color from parents.
      Starting with the cell to its left and moving clockwise, it takes the R value from the leftmost parent, the G value from the next parent, and the B value from the third parent. Since new cells are only born when they have exactly 3 of their 8 neighbor cells populated, this works cleanly.
  - [ ] Model the maturity of each cell with opacity.
    - [ ] opacity will start at 0.1
    - [ ] increase by 0.1 each cycle of the game it survives to 1
  - [ ] Play/Pause buttons
  - [ ] Clear the board button
  - [ ] Speed Slider

  - [ ] Make more robust / modular (for easier extension)

Enhancements
 - [ ] Pen size slider
 - [ ] Put back in jsFiddle and send us the link
