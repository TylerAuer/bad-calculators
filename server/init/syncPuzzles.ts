import fs from 'fs';
const { BC_Puzzle } = require('../orm/models');

/**
 * Looks at every file in the puzzle folder. And adds the puzzles to the DB
 * if they aren't yet there.
 */

export default async function () {
  let newPuzzleCount = 0;
  let oldPuzzleCount = 0;

  const puzzleFilenameList = fs.readdirSync(__dirname + '/../../puzzles');

  for (let filename of puzzleFilenameList) {
    const { puzzle } = require(__dirname + '/../../puzzles/' + filename);

    const foundPuzzle = await BC_Puzzle.findOne({ where: { id: puzzle.id } });
    console.log(foundPuzzle);

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
