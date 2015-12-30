For the purposes of this project we will use this one http://jsfiddle.net/blesh/n9S8R/light/ as an example.

Challenge:
Your challenge is to create a javascript G.O.L. implementation that acts much like the jsfiddle example above, but has some expanded capabilities:
  - Like the jsfiddle example, your G.O.L will adhere to Conway’s standard set of 4 rules:
    1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
    2. Any live cell with two or three live neighbors lives on to the next generation.
    3. Any live cell with more than three live neighbors dies, as if by overcrowding.
    4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
  - The user can define the height and width of the board through the UI.
  - In most G.O.L. programs, each cell has just one of two states, either alive or dead. In this project we are going to add color to each living cell, like a representation of its genetic code inherited from its parents. Each cell’s color will be an RGB value, determined in one of two ways:

At the beginning, when the user sets the seed configuration for the cells, they will also set the RGB color for each cell in the seed by using a color picker control.
As the G.O.L. is running, each new cell that is born will derive its RGB color value from its 3 parents. Starting with the cell to its left and moving clockwise, it takes the R value from the leftmost parent, the G value from the next parent, and the B value from the third parent. Since new cells are only born when they have exactly 3 of their 8 neighbor cells populated, this works cleanly.
  - In addition to modeling the genetics of each cell through color, we will model the maturity of each cell with opacity. A cell’s opacity will start at 0.1 when it is first born or seeded, and then will be increase by 0.1 each cycle of the game it survives. Once a cell’s opacity reaches 1, that cell is mature, and its opacity will remains at 1. If a cell dies and then is born again, its opacity will begin again at 0.1.
  - Unlike the jsfiddle example referenced above, the G.O.L should not be constantly running. A control panel should allow the user to start the game after it has been seeded, to pause the game, and to clear the board.
  - A slider should allow the user to set the speed of simulation, like in the jsfiddle example referenced above.

Design rules and considerations:
  - This project should be done in jsfiddle using only javascript, HTML5 and CSS. No third-party frameworks or libraries should be used. HTML5 has a native “color” input type, so no external libraries should be necessary for color picking.
  - This project should be built in an object-oriented manner. Besides for a small initialization function, the rest of the code should involve property and method calls on objects.
  - UX consideration: Requiring each cell in the seed to have a color makes for a much more complex user-interaction experience. Try to minimize the number of clicks required to set colors on the seed cells and try to make this as easy an experience for the user as possible.
  - Design consideration: This design interview will involve 2-parts, in which this is just part one. Once you demonstrate a working version of the application as defined in this specification, we will introduce a new modification to the requirements and see what is involved in order for your program to accommodate the change. It is important that you think about how to design your code so as to make it as easy as possible to create future variations with minimal effort. When we are reviewing your solution together, we will ask you what structures in your code you added specifically to make the solution more flexible to unknown future requirements.

Timeline, questions, submission, and review meeting:
  - We recognize that you’ll be building this project in your free time and balancing your work schedule, so the timeline for completion is completely up to you.
  - If you have questions as you work on this, you can feel free to reach out to us for clarification.
  - Once you have a working demo on jsfiddle or codepen, just send us the link. We’ll review it internally and then set up a time to discuss it together.
