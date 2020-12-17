import fs from 'fs';
import chalk from 'chalk';
import { Puzzle } from '../app/src/structs/puzzle';

/**
 * Looks at every file in the puzzle folder.
 *
 * Computes some statistics and logs them to the console.
 */

interface PuzFile {
  puzzle: Puzzle;
}

console.clear();

const logStats = () => {
  let puzCount = 0; // Counts total puzzles
  const levels = {}; // Counts puzzles per level
  const opCount = {}; // Counts number of each operation

  const puzzleFilenameList = fs.readdirSync(__dirname + '/');

  for (let filename of puzzleFilenameList) {
    if (!filename.match(/\d+-\d+.ts/)) {
      continue;
    }

    const puzFile: PuzFile = require(__dirname + '/' + filename);
    const { puzzle } = puzFile;

    // INCREMENT COUNTERS //////////////////////////////////////////////////////

    // Total puzzles
    puzCount++;

    // Puzzles by level
    if (!levels[puzzle.level]) levels[puzzle.level] = 0;
    levels[puzzle.level] += 1;

    // Operations
    puzzle.operations.forEach((op) => {
      if (!opCount[op.symbol]) opCount[op.symbol] = 0;
      opCount[op.symbol]++;
    });
  }

  // TOTAL PUZZLES /////////////////////////////////////////////////////////////
  console.log(puzCount, chalk.red('PUZZLES'));

  // PUZZLES / LEVEL ///////////////////////////////////////////////////////////
  console.log(' ');
  console.log(`LVL | Count`);
  console.log(`----|-------`);
  Object.entries(levels).forEach(([lvl, count]) => {
    console.log(`${lvl}${lvl.length > 1 ? '' : ' '}  | ${count}`);
  });

  // OP COUNT //////////////////////////////////////////////////////////////////
  console.log(' ');
  console.log(`Operation       | Count`);
  console.log(`----------------|------------`);
  Object.entries(opCount).forEach(([op, count]) => {
    const spaces = 15 - op.length;

    console.log(`${op}${' '.repeat(spaces)} | ${count}`);
  });

  console.log(' ');
};

logStats();
