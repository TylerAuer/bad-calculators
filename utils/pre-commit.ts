/**
 * Performs checks before making commit to ensure unique and ordered Puzzle IDs
 * in the DB
 */

import fs from 'fs';
import chalk from 'chalk';
import { Puzzle } from '../app/src/structs/puzzle';
import { exit } from 'process';

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

const redBoldLog = (msg: string) => console.log(chalk.red.bold(msg));
const blueBoldLog = (msg: string) => console.log(chalk.cyan.bold(msg));
const spaceLog = () => console.log(' ');

blueBoldLog(`Checking files in /puzzles for correct sequencing of IDs`);
spaceLog();

const puzzles = loadPuzzles();

spaceLog();
checkPuzzles(puzzles);

function loadPuzzles() {
  const puzzles: Puzzle[] = [];
  const puzzleFilenameList = fs.readdirSync(__dirname + '/../puzzles');
  let puzzleCount = 0;

  for (let filename of puzzleFilenameList) {
    // Skip any files that aren't puzzles
    if (!filename.match(/\d+-\d+.js/)) {
      console.log(`Ignoring: ${filename}`);
      continue;
    } else {
      puzzleCount++;
    }

    // Load puzzle
    const puzFile: PuzFile = require(__dirname + '/../puzzles/' + filename);
    const { puzzle } = puzFile;

    puzzles.push(puzzle);
  }

  spaceLog();
  console.log(`Successfully loaded ${puzzleCount} puzzles from files.`);
  return puzzles;
}

function checkPuzzles(puzzles: Puzzle[]) {
  // Holds all ids to be sure they are unique and sequential
  const puzIds: Tracker = {};

  // Holds level indexes to be sure they are unique and sequential
  const levelIndexes: LvlIndexTracker = {};

  for (let puzzle of puzzles) {
    const name = `${puzzle.level}-${puzzle.indexInLevel}`;

    /**
     * Check that no IDs are repeated between puzzles
     */
    if (puzIds[puzzle.id]) {
      redBoldLog(
        `${name} and ${puzIds[puzzle.id]} have the same ID of ${puzzle.id}`
      );
      exit(5);
    } else {
      puzIds[puzzle.id] = name;
    }

    /**
     * Check that no level has a repeated indexInLevel
     */
    if (
      levelIndexes[puzzle.level] &&
      levelIndexes[puzzle.level][puzzle.indexInLevel]
    ) {
      redBoldLog(`Two files share the same level index: ${name}`);

      exit(5);
    } else {
      if (!levelIndexes[puzzle.level]) levelIndexes[puzzle.level] = {};
      levelIndexes[puzzle.level][puzzle.indexInLevel] = name;
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
    redBoldLog(`Missing ID(s): ${missingIds.join(',')}`);
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
      redBoldLog(
        `Level ${level} is missing index(es): ${missingIdxs.join(',')}`
      );
      exit(5);
    }
  }
}

blueBoldLog('Puzzle IDs and level indexes are valid. Completing commit.');
exit(0);
