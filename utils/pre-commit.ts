/**
 * Performs checks before making commit to ensure unique and ordered Puzzle IDs
 * in the DB
 */

import fs from 'fs';
import chalk from 'chalk';
import { Puzzle } from '../app/src/structs/puzzle';
import { exit } from 'process';
import { fileURLToPath } from 'url';

/**
 * Looks at every file in the puzzle folder.
 *
 * Checks that the IDs are unique and incremented by 1
 * Checks that the indexes at each level are unique and incremented by 1
 */

interface PuzFile {
  puzzle: Puzzle;
}

interface Tracker {
  [key: number]: string; // puzzle.id: filename
}

interface LvlIndexTracker {
  [key: number]: Tracker; // level: {indexInLevel: filename}
}

console.clear();
console.log(
  chalk.cyan.bold(
    `Checking puzzle IDs and level indexes for uniqueness and sequentiality
    `
  )
);

const checkPuzzles = () => {
  // Holds all ids to be sure they are unique and sequential
  const puzIds: Tracker = {};

  // Holds level indexes to be sure they are unique and sequential
  const levelIndexes: LvlIndexTracker = {};

  const puzzleFilenameList = fs.readdirSync(__dirname + '/../puzzles');

  for (let filename of puzzleFilenameList) {
    // Skip any files that aren't puzzles
    if (!filename.match(/\d*-\d.js/)) {
      continue;
    }

    // Load puzzle
    const puzFile: PuzFile = require(__dirname + '/../puzzles/' + filename);
    const { puzzle } = puzFile;

    /**
     * Check that no IDs are repeated between puzzles
     */
    if (puzIds[puzzle.id]) {
      console.log(
        chalk.red.bold(`${filename} and ${puzIds[puzzle.id]} have the same ID`)
      );
      exit(5);
    } else {
      puzIds[puzzle.id] = filename;
    }

    /**
     * Check that no level has a repeated indexInLevel
     */
    if (
      levelIndexes[puzzle.level] &&
      levelIndexes[puzzle.level][puzzle.indexInLevel]
    ) {
      console.log(
        chalk.red.bold(
          `${filename} and ${
            levelIndexes[puzzle.level][puzzle.indexInLevel]
          } are both in level ${puzzle.level} and share the same index`
        )
      );
      exit(5);
    } else {
      if (!levelIndexes[puzzle.level]) levelIndexes[puzzle.level] = {};
      levelIndexes[puzzle.level][puzzle.indexInLevel] = filename;
    }
  }

  /**
   * Check that the IDs are sequential
   */
  const idCount = Object.keys(puzIds).length;
  const missingIds: number[] = [];

  // Check if any IDs are missing
  for (let i = 0; i < idCount; i++) {
    if (!puzIds[i]) missingIds.push(i);
  }

  // Log and exit if found any missing IDs
  if (missingIds.length) {
    console.log(chalk.red.bold(`Missing ID(s): ${missingIds.join(',')}`));
    exit(5);
  }

  /**
   * Check that the indexInLevel values are sequential for each level
   */
  const levels = Object.keys(levelIndexes);
  for (let level of levels) {
    const lvl: LvlIndexTracker = levelIndexes[level];
    const indexCountForLvl = Object.keys(lvl).length;

    const missingIdxs: number[] = [];
    for (let i = 1; i <= indexCountForLvl; i++) {
      if (!levelIndexes[level][i]) missingIdxs.push(i);
    }

    if (missingIdxs.length) {
      console.log(
        chalk.red.bold(
          `Level ${level} is missing index(es): ${missingIdxs.join(',')}`
        )
      );
      exit(5);
    }
  }
};

checkPuzzles();

console.log(chalk.cyan('All good! Puzzle IDs and level indexes are valid.'));
exit(0);
