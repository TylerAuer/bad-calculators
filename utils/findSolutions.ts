import chalk from 'chalk';
import { puzzle } from '../puzzles/2-1';
import genOpBtnTextAndOp from '../app/src/utils/genOpBtnTextAndOp';

interface Solution {
  values: number[];
  actions: string[];
  opCounts: number[];
}

interface ValuesSeen {
  [key: number]: boolean;
}

const MAX_DEPTH = 15;

// Destructure values from puzzle
const { start, target, maxMoves, operations, blocks } = puzzle;

// Limit depth of search to puzzle limit or MAX_DEPTH constant
const max = Math.min(maxMoves || Infinity, MAX_DEPTH);

// Storage for found solutions
const solutions: Solution[] = [];

const valuesSeen = {};

// Generate functions for performing operations
const ops = operations.map((f) => genOpBtnTextAndOp(f));

console.clear();
console.log(`
${chalk.cyan.bold(
  `// Solving ${puzzle.level}-${puzzle.indexInLevel} //////////////`
)}
${chalk.magenta(`Start: ${start}`)}
${chalk.magenta(`Target: ${target}`)}
${chalk.magenta(`Ops: ${ops.map((o) => o.text).join(', ')}`)}
${blocks.length ? chalk.magenta(`Blocks: ${blocks.join(', ')}`) : ''}`);

findSolutions();
printSolutions();

function findSolutions(): void {
  const initialSolution: Solution = {
    values: [start],
    actions: [],
    opCounts: Array<number>(operations.length).fill(0),
  };

  recurse(initialSolution);
}

function recurse(solution: Solution): void {
  const curVal = solution.values[solution.values.length - 1];

  // Arrived at target (BASE CASE)
  if (curVal === target) {
    solutions.push(solution);
    return;
  }

  // Passed Max Depth (BASE CASE)
  if (solution.actions.length >= max) {
    // console.log(`Trim branch (max depth reached: ${solution.actions.length})`);
    return;
  }

  // Hit Block (BASE CASE)
  if (blocks.includes(curVal)) {
    // console.log('Trim branch (hit block)');
    return;
  }

  ops.forEach((op, i) => {
    // Don't use operations that have reached their limit
    if (op.limit === solution.opCounts[i]) {
      // console.log(`Trim branch (hit op limit)`);
      return;
    }

    // Calculate the next value using the current operation
    const nextSolution = JSON.parse(JSON.stringify(solution)); // DEEP COPY!
    const lastVal = nextSolution.values[nextSolution.values.length - 1];
    nextSolution.values.push(op.op(lastVal));

    // Add text description to list of actions
    nextSolution.actions.push(op.text);

    // Increment the operation counter
    nextSolution.opCounts[i]++;

    recurse(nextSolution);
  });
}

function printSolutions(): void {
  // TODO: Sort functions by the number of steps (ascending)
  solutions.sort((a, b) => {
    return a.actions.length - b.actions.length;
  });

  // Log out the solutions in a pretty way
  solutions.forEach((s, i) => {
    const steps = s.actions.length;
    const path = s.actions.join(' ');

    logCyan(`#${i + 1} (${steps} steps)`);
    console.log(start + ' ' + path);
    console.log('');
  });
}

function logMagenta(text: string): void {
  console.log(chalk.magenta.bold(text));
}

function logCyan(text: string): void {
  console.log(chalk.cyan(text));
}
