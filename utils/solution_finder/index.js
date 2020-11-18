const findShortestSolution = require('./find_shortest_solution');

// Questions (with notes in predicted difficulty)

// INTRO //
// console.log(findShortestSolution(['+ 1', '+ 2'], 12));
// console.log(findShortestSolution(['+ 5', '+ 3'], 33));

// EASY //
// console.log(findShortestSolution(['* 2', '- 1'], 15, 1));
// console.log(findShortestSolution(['+ 1', '* 2'], 15, 3));
console.log(findShortestSolution(['^ 2', '+ 0.5'], 16, 0.5));

// MEDIUM //

// Must square negatives
// console.log(findShortestSolution(['^ 2', '- 1'], 15, 1));

// Can add 1.75 to get to 21 then subtract 1s but going to negatives is better
// console.log(findShortestSolution(['^ 2', '- 1', '+ 0.75'], 15, 1));

// HARD //
