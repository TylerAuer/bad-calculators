import fs from 'fs';
import chalk from 'chalk';
import { Puzzle } from '../app/src/structs/puzzle';

/**
 * Looks at every file in the puzzle folder.
 *
 * Computes some statistics and logs them to the console.
 */

const filesToSkip = ['template.js', 'buildNewPuzzle.js', 'stats.js'];

interface PuzFile {
  puzzle: Puzzle;
}

const logStats = () => {
  let levels = {};

  const puzzleFilenameList = fs.readdirSync(__dirname + '/');

  for (let filename of puzzleFilenameList) {
    if (filesToSkip.includes(filename)) continue;

    const puzFile: PuzFile = require(__dirname + '/' + filename);
    const { puzzle } = puzFile;

    if (!levels[puzzle.level]) levels[puzzle.level] = 0;
    levels[puzzle.level] += 1;
  }

  /**
   * PUZZLES PER LEVEL
   */
  console.log(' ');
  console.log(chalk.blue('PUZZLES PER LEVEL'));
  console.log(' ');
  console.log(`LVL | Count`);
  console.log(`----|-------`);
  Object.entries(levels).forEach(([lvl, count]) => {
    console.log(`${lvl}${lvl.length > 1 ? '' : ' '}  | ${count}`);
  });

  console.log(' ');
};

logStats();
