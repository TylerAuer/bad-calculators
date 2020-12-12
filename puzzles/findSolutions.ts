import chalk from 'chalk';
import { puzzle } from './1-10';
import genOpBtnTextAndOp from '../app/src/utils/genOpBtnTextAndOp';

interface Solution {
  values: number[];
  actions: string[];
  opCounts: number[];
}

const MAX_DEPTH = 12;
const TRIM_INEFFICIENT_PATHS = false;

// Destructure values from puzzle
const { start, target, maxMoves, operations, blocks } = puzzle;

// Limit depth of search to puzzle limit or MAX_DEPTH constant
const max = Math.min(maxMoves || Infinity, MAX_DEPTH);

// Storage for found solutions
let solutionCount = 0;

// Generate functions for performing operations
const ops = operations.map((f) => genOpBtnTextAndOp(f));

printHeader();
findSolutions();

/**
 * Prints a header with data about the puzzle
 */
function printHeader(): void {
  console.clear();
  console.log(`
${chalk.cyan.bold(
  `// Solving ${puzzle.level}-${puzzle.indexInLevel} //////////////`
)}
${chalk.magenta(`Start: ${start}`)}
${chalk.magenta(`Target: ${target}`)}
${chalk.magenta(`Ops: ${ops.map((o) => o.text).join(', ')}`)}
${blocks.length ? chalk.magenta(`Blocks: ${blocks.join(', ')}`) : ''}`);
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
function findSolutions(): void {
  const initialSolution: Solution = {
    values: [start],
    actions: [],
    opCounts: Array<number>(operations.length).fill(0),
  };

  // Tracks visited numbers so less-efficient redundant paths can be trimmed
  const visited = {
    [start]: true,
  };

  let maxDepthSeen = 1;

  // For breadth first search of solution tree
  const queue = [initialSolution];

  while (queue.length) {
    const cur = queue.shift();
    const curVal = cur!.values[cur!.values.length - 1];

    // Log new depth if needed
    if (cur!.actions.length > maxDepthSeen) {
      maxDepthSeen = cur!.actions.length;
      logMagenta(
        `// Finished searching paths ${
          maxDepthSeen - 1
        } actions long /////////////////`
      );
    }

    // Arrived at target
    if (curVal === target) {
      logSolution(cur!);
      continue;
    }

    // Passed Max Depth
    if (cur!.actions.length >= max) {
      continue;
    }

    // Hit Block
    if (blocks.includes(curVal)) {
      continue;
    }

    ops.forEach((op, i) => {
      // Don't use operations that have reached their limit
      if (op.limit === cur!.opCounts[i]) {
        // console.log(`Trim branch (hit op limit)`);
        return;
      }

      // Calculate the next value using the current operation
      const nextSolution = JSON.parse(JSON.stringify(cur!)); // DEEP COPY!
      const lastVal = nextSolution.values[nextSolution.values.length - 1];
      const nextVal = op.op(lastVal);

      // Trim branch if revisiting a value
      if (TRIM_INEFFICIENT_PATHS && visited[nextVal]) return;
      else visited[nextVal] = true;

      nextSolution.values.push(nextVal);

      // Add text description to list of actions
      nextSolution.actions.push(op.text);

      // Increment the operation counter
      nextSolution.opCounts[i]++;

      queue.push(nextSolution);
    });
  }
}

function logSolution(solution: Solution): void {
  const steps = solution.actions.length;
  const path = solution.actions.join(' ');

  // Log out the solutions in a pretty way
  console.log(chalk.cyan(`#${++solutionCount} [${steps} steps]`), path);
}

function logMagenta(text: string): void {
  console.log(chalk.magenta(text));
}

function logCyan(text: string): void {
  console.log(chalk.cyan(text));
}
