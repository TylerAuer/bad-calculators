import fs from 'fs';
const { BC_Puzzle } = require('../server/orm/models');

/**
 * Looks at every file in the puzzle folder. And adds the puzzles to the DB
 * if they aren't yet there.
 */

export default async function () {
  console.log('Loading new puzzles into DB');

  fs.readdirSync(__dirname + '/../puzzles').forEach(async (filename) => {
    const { puzzle } = require(__dirname + '/../puzzles/' + filename);

    const foundPuzzle = await BC_Puzzle.findOne({
      where: {
        id: puzzle.id,
      },
    });

    if (foundPuzzle) {
      BC_Puzzle.update(
        {
          ...puzzle,
        },
        {
          where: {
            id: puzzle.id,
          },
        }
      );
    } else {
      BC_Puzzle.create({ ...puzzle });
    }
  });
}
