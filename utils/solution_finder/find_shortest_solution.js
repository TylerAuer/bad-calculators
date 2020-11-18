const genOperation = require('./generate_operations');

module.exports = function findShortestSolution(
  moves,
  goal,
  initial = 0,
  maxMoves = 18
) {
  // Converts operations passed into moves to functions that can be invoked.
  // EX: '+ 5' becomes (val) => val + 5
  const actions = moves.map((move) => genOperation(move));

  const visited = {};
  const queue = [
    { val: initial, moveCount: 0, desc: initial.toString(10) + ' ' },
  ];

  while (queue.length) {
    const curr = queue.shift();

    // Check if you have arrived at the goal
    if (curr.val == goal) return curr;

    // Check if you've hit the depth limit
    if (curr.moveCount > maxMoves) {
      throw new Error(`No path found within ${maxMoves} moves`);
    }

    for (action of actions) {
      const { result, desc } = action(curr.val);

      // Operations return false if the input is invalid. For example,
      // trying to use factorial on a negative number returns false
      // Since the result is false, don't continue this branch of the tree.
      if (result === false) continue;

      // Check if you have been to this value before which prevents loops
      // and trims longer paths with short variations
      if (visited[result]) continue;

      // Add new value to visited hash map
      visited[result] = true;

      queue.push({
        val: result,
        moveCount: curr.moveCount + 1,
        desc: curr.desc + desc + ' ',
      });
    }
  }

  throw new Error(`No path found within ${maxMoves} moves`);
};
