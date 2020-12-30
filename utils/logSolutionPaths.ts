import { exit } from 'process';
import chalk from 'chalk';
import prompts, { PromptObject } from 'prompts';
import genOpBtnTextAndOp from '../app/src/calculatorFunctions/genOpBtnTextAndOp';
import { Puzzle, Star, Solution } from '../app/src/structs/puzzle';
import findSolutions from './findSolutions';

startPuzzleSolutionLoggingLoopOnCommandLine();

async function startPuzzleSolutionLoggingLoopOnCommandLine() {
  const { filename, depth } = await promptForLevelAndMoveCount();

  loadPuzzleAndLogSolutions(filename, depth);

  promptToTryAgain(filename, depth);
}

function loadPuzzleAndLogSolutions(filename: string, depth: number) {
  const { puzzle } = require(`../puzzles/${filename}.ts`);
  printHeader(puzzle);

  const solutions = findSolutions(puzzle, depth);

  Object.entries(solutions).forEach(([length, listOfSolutions]) => {
    logMagenta(`// Solutions of length ${length} //////`);

    // Log the first 10 solutions for a given number of moves
    listOfSolutions.forEach((solution, i) => {
      if (i < 10) logSolution(solution);
      else if (i === 10)
        console.log(`...and ${listOfSolutions.length - 10} more`);
    });
    console.log(' ');
  });
}

async function promptForLevelAndMoveCount(): Promise<{
  filename: string;
  depth: number;
}> {
  const questions: PromptObject[] = [
    {
      type: 'text',
      name: 'filename',
      message: 'What puzzle would you like to test?',
    },
    {
      type: 'number',
      name: 'depth',
      message: 'How many moves?',
    },
  ];

  const { filename, depth } = await prompts(questions);

  return { filename, depth };
}

async function promptToTryAgain(filename: string, depth: number) {
  const { shouldTryAgain } = await prompts({
    type: 'confirm',
    name: 'shouldTryAgain',
    message: 'Rerun?',
    initial: true,
  });

  if (shouldTryAgain) {
    loadPuzzleAndLogSolutions(filename, depth);
    promptToTryAgain(filename, depth);
  } else {
    exit(0);
  }
}

/**
 * Prints a header with data about the puzzle
 */
function printHeader(puzzle: Puzzle): void {
  const {
    level,
    indexInLevel,
    start,
    target,
    operations,
    blocks,
    stars,
  } = puzzle;

  // Generate functions for performing operations
  const ops = operations.map((f) => genOpBtnTextAndOp(f));

  const goalText = (star: Star) => {
    const goalMap = {
      exactly: '=',
      fewer: '≤',
      more: '>',
    };
    const symbolPrefix = star.goalRelation ? goalMap[star.goalRelation] : '∞';
    const starNumber = star.moves === Infinity ? '' : star.moves;

    return symbolPrefix + starNumber;
  };

  const goals = stars.map((star) => goalText(star));

  console.clear();
  console.log(`
${chalk.cyan.bold(`// Solving ${level}-${indexInLevel} //////////////`)}
${chalk.magenta(`Start: ${start}`)}
${chalk.magenta(`Target: ${target}`)}
${chalk.magenta(`Ops: ${ops.map((o) => o.text).join(', ')}`)}
${chalk.magenta(`Goals: ${goals.join(', ')}`)}
${blocks.length ? chalk.magenta(`Blocks: ${blocks.join(', ')}`) : ''}`);
}

function logSolution(solution: Solution): void {
  const steps = solution.actions.length;
  const path = solution.actions.join(' ');

  // Log out the solutions in a pretty way
  console.log(chalk.cyan(`[${steps} steps]`), path);
}

function logMagenta(text: string): void {
  console.log(chalk.magenta(text));
}

function logRed(text: string): void {
  console.log(chalk.red.bold(text));
}
