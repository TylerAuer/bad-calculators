/**
 * FUNCTIONS TO ADD
 *
 * To Binary
 * To Base 10
 * Floor
 * Ceiling
 * Square Root
 * Concat
 * Absolute Value
 * Reciprocal
 * Log
 * Collatzify --> (if even halve else 3n + 1)
 */

const math = require('mathjs');

module.exports = function genOperation(calculation) {
  const [sign, operand] = calculation.split(' ');
  const precision = 12;

  const output = {
    desc: calculation,
  };

  switch (sign) {
    case '+':
      return (val) => {
        const sum = math.add(val, parseFloat(operand));
        output.result = math.format(sum, { precision });
        return output;
      };
    case '-':
      return (val) => {
        const dif = math.subtract(val, parseFloat(operand));
        output.result = math.format(dif, { precision });
        return output;
      };
    case '*':
      return (val) => {
        const product = math.multiply(val, parseFloat(operand));
        output.result = math.format(product, { precision });
        return output;
      };
    case '/':
      return (val) => {
        const quotient = math.divide(val, parseFloat(operand));
        output.result = math.format(quotient, { precision });
        return output;
      };
    case '^':
      return (val) => {
        const exp = math.pow(val, parseFloat(operand));
        output.result = math.format(exp, { precision });
        return output;
      };
    case '%':
      return (val) => {
        const remainder = math.mod(val, parseFloat(operand));
        output.result = math.format(remainder, { precision });
        return output;
      };
    case '!':
      return (val) => {
        if (val > 15 || val < 0 || val % 1 !== 0) {
          // Number isn't an integer, so return null
          // Limit the size of numbers that can be handled
          output.result = false;
          return output;
        } else {
          output.result = math.factorial(val);
          return output;
        }
      };
    default:
      throw new Error('Invalid operator');
  }
};

function findShortestPath(moves, goal, initial = 0, maxMoves = 12) {
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
}
