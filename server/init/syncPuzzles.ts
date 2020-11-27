import fs from 'fs';
const { BC_Puzzle } = require('../orm/models');

/**
 * Looks at every file in the puzzle folder. And adds the puzzles to the DB
 * if they aren't yet there.
 */

export default async function () {
  let newPuzzleCount = 0;
  let oldPuzzleCount = 0;

  await updatePuzzles();

  console.log(' ');
  console.log(`Verifying ${newPuzzleCount + oldPuzzleCount} puzzles in DB`);
  console.log(`Loaded ${newPuzzleCount} new puzzles.`);
  console.log(`Checked for updates in ${oldPuzzleCount} old puzzles.`);
  console.log(' ');

  async function updatePuzzles() {
    fs.readdirSync(__dirname + '/../../puzzles').forEach(async (filename) => {
      const { puzzle } = require(__dirname + '/../../puzzles/' + filename);

      const foundPuzzle = await BC_Puzzle.findOne({ where: { id: puzzle.id } });

      if (foundPuzzle) {
        oldPuzzleCount++;
        await BC_Puzzle.update({ ...puzzle }, { where: { id: puzzle.id } });
      } else {
        newPuzzleCount++;
        await BC_Puzzle.create({ ...puzzle });
      }
    });
  }
}
