import fs from 'fs';
import { Puzzle } from '../../app/src/structs/puzzle';
const { BC_Puzzle } = require('../orm/models');

/**
 * Looks at every file in the puzzle folder. And adds the puzzles to the DB
 * if they aren't yet there. Ignores any files not named #-#.js
 */

export let totalStarCount = 0;

export default async function () {
  let newPuzzleCount = 0;
  let oldPuzzleCount = 0;

  const puzzleFilenameList = fs.readdirSync(__dirname + '/../../puzzles');

  for (let filename of puzzleFilenameList) {
    // Skip any files not named as ##-##.js
    if (!filename.match(/\d*-\d.js/)) {
      console.log('Skipping', filename);
      continue;
    }

    const file = require(__dirname + '/../../puzzles/' + filename);
    const puzzle: Puzzle = file.puzzle;

    totalStarCount += puzzle.stars.length;

    const foundPuzzle = await BC_Puzzle.findOne({ where: { id: puzzle.id } });

    if (foundPuzzle) {
      oldPuzzleCount++;
      await BC_Puzzle.update({ ...puzzle }, { where: { id: puzzle.id } });
    } else {
      newPuzzleCount++;
      await BC_Puzzle.create({ ...puzzle });
    }
  }

  console.log(' ');
  console.log(`${newPuzzleCount + oldPuzzleCount} puzzles found in /puzzles`);
  console.log(`${newPuzzleCount} new and ${oldPuzzleCount} old synced with DB`);
  console.log(' ');
}
