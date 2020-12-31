import genOpBtnTextAndOp from '../app/src/calculatorFunctions/genOpBtnTextAndOp';
import { Puzzle, Solution, Star } from '../app/src/structs/puzzle';

interface SolutionsByLength {
  [key: string]: Solution[];
}

/**
 * Finds all of the most efficient solutions that take fewer than the MAX_DEPTH
 * number of moves.
 *
 * Setting TRIM_INEFFICIENT_PATHS = true makes the algorthm faster in many cases
 * but hides some solutions. It does not find solutions that take more moves but
 * visit a number seen on a shorter solution.
 *
 * For example, if the ops are -1, -2, and *2; start is 10; and target
 * is 16
 *
 * SOLUTION A: 10 -> (8) -> 16
 * SOLUTION B: 10 -> 9 -> (8) -> 16
 *
 * Only solution A will be "found" because B's path travels through 8 in a less
 * efficient way
 */
export default function findSolutions(
  puzzle: Puzzle,
  requestedMoveDepth: number = 0,
  givenSolutions: number[][] = [] // Used to pass depth from CLI
): SolutionsByLength {
  const solutions: SolutionsByLength = {};

  // Destructure object for elements of puzzle
  const { start, target, operations, blocks, stars } = puzzle;

  let maxMovesToCheck = requestedMoveDepth;

  // If maxMovesToCheck = 0, that means we should look at the stars to determine
  // the max depth to check.
  if (maxMovesToCheck === 0) {
    maxMovesToCheck = determineMaxMovesToCheckFromStars(
      stars,
      operations.length
    );
  }

  // Process operations into functions
  const ops = operations.map((f) => genOpBtnTextAndOp(f));

  // Add any given solutions to the solutions object
  givenSolutions.forEach((solution, i) => {
    let val = start;
    solution.forEach((opIndex) => {
      val = ops[opIndex].op(val);
    });

    if (val !== target) {
      console.log(`Ended at ${val} but target is ${target}`);
      throw new Error('Issue with givenSolution at index ${i}');
    } else {
      solutions[solution.length] = [
        {
          values: [],
          actions: [],
          opCounts: [],
        },
      ];
    }
  });

  const initialSolution: Solution = {
    values: [start],
    actions: [],
    opCounts: Array<number>(ops.length).fill(0),
  };

  // For breadth first search of solution tree
  const queue = [initialSolution];

  while (queue.length) {
    const cur = queue.shift();
    const curVal = cur!.values[cur!.values.length - 1];

    // Arrived at target
    if (curVal === target) {
      // Add key to solutions object if needed
      const moveCount = cur!.values.length - 1;
      if (!solutions[moveCount]) solutions[moveCount] = [];

      solutions[moveCount].push(cur!);
    }

    // Passed Max Depth
    if (cur!.actions.length >= maxMovesToCheck) {
      continue;
    }

    // Hit Block
    if (blocks.includes(curVal)) {
      continue;
    }

    // Recursively call functions
    ops.forEach((op, i) => {
      // Don't use operations that have reached their limit
      if (op.limit === cur!.opCounts[i]) {
        return;
      }

      // Calculate the next value using the current operation
      const nextSolution = JSON.parse(JSON.stringify(cur!)); // DEEP COPY!
      const lastVal = nextSolution.values[nextSolution.values.length - 1];
      const nextVal = op.op(lastVal);

      nextSolution.values.push(nextVal);

      // Add text description to list of actions
      nextSolution.actions.push(op.text);

      // Increment the operation counter
      nextSolution.opCounts[i]++;

      queue.push(nextSolution);
    });
  }

  return solutions;
}

function determineMaxMovesToCheckFromStars(stars: Star[], opCount: number) {
  if (!stars.length) {
    throw new Error('Stars not provided for puzzle');
  }

  let depthLimitFromOpCount = 6;
  if (opCount === 4) depthLimitFromOpCount = 8;
  if (opCount === 3) depthLimitFromOpCount = 10;
  if (opCount === 2) depthLimitFromOpCount = 14;

  let depthLimitFromStarReqs = 0;
  stars.forEach((star) => {
    if (star.goalRelation === 'exactly' || star.goalRelation === 'fewer') {
      depthLimitFromStarReqs = Math.max(depthLimitFromStarReqs, star.moves);
    } else if (star.goalRelation === 'more') {
      depthLimitFromStarReqs = Math.max(depthLimitFromStarReqs, star.moves + 2);
    }
  });

  return Math.min(depthLimitFromOpCount, depthLimitFromStarReqs);
}
