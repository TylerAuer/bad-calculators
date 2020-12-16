import fs from 'fs';
import { Puzzle } from '../../app/src/structs/puzzle';
const { BC_Puzzle } = require('../orm/models');
const { BC_Tracking } = require('../orm/models');

/**
 * Looks at every file in the puzzle folder. And adds the puzzles to the DB
 * if they aren't yet there. Ignores any files not named #-#.js
 */

export let totalStarCount = 0;

export default async function () {
  const puzzleFilenameList = fs.readdirSync(__dirname + '/../../puzzles');

  for (let filename of puzzleFilenameList) {
    // Skip any files not named as ##-##.js
    if (!filename.match(/\d+-\d+.js/)) {
      console.log('Skipping', filename);
      continue;
    }

    const file = require(__dirname + '/../../puzzles/' + filename);
    const puzzle: Puzzle = file.puzzle;

    totalStarCount += puzzle.stars.length;

    const foundPuzzle = await BC_Puzzle.findOne({ where: { id: puzzle.id } });

    if (foundPuzzle) {
      await BC_Puzzle.update({ ...puzzle }, { where: { id: puzzle.id } });
    } else {
      await BC_Puzzle.create({ ...puzzle });
    }

    await BC_Tracking.findOrCreate({ where: { BCPuzzleId: puzzle.id } });
  }
}
