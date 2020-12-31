import { readdirSync } from 'fs';
import { exit } from 'process';
import chalk from 'chalk';
import { Puzzle, Star } from '../app/src/structs/puzzle';
import findSolutions from './findSolutions';

console.log(`Validating that each solution on every puzzle can be reached`);

validatePuzzleSolutions();

console.log(` `);
console.log(`All puzzles validated`);
exit(0);

function validatePuzzleSolutions() {
  const pathToPuzzles = __dirname + '/../puzzles';

  const puzzleFilenameList = readdirSync(pathToPuzzles);

  for (let filename of puzzleFilenameList) {
    // Skip any files not named as ##-##.js
    if (!filename.match(/\d+-\d+.js/)) {
      continue;
    }

    console.log(' ');
    console.log(chalk.blue.bold(`Validating ${filename}`));

    const file = require(pathToPuzzles + '/' + filename);
    const puzzle: Puzzle = file.puzzle;
    console.log(chalk.blue(`|-- loaded file`));

    const solutions = findSolutions(puzzle, undefined, file.givenSolutions);
    console.log(chalk.blue(`|-- found solutions`));

    const solutionLengths = Object.keys(solutions);
    let stars = [...puzzle.stars];

    solutionLengths.forEach((moveCount) => {
      const solutionsFoundForCurrentLength: number[] = [];

      // Check which stars requirements are met by the given solution length
      stars.forEach((star, i) => {
        const meetsReq = checkMovesMatchStar(parseInt(moveCount), star);
        if (meetsReq) solutionsFoundForCurrentLength.push(i);
      });

      // console.log(solutionsFoundForCurrentLength);
      stars = stars.filter(
        (star, i) => solutionsFoundForCurrentLength.indexOf(i) === -1
      );
    });

    // Handle case where puzzle fails validation
    if (stars.length) {
      console.log(
        chalk.red.bold(
          `Puzzle ${filename} failed because these stars were unmet:`
        )
      );
      stars.forEach((star) => console.log(JSON.stringify(star, null, 2)));
      exit(5);
    }
  }
}

function checkMovesMatchStar(moveCount: number, star: Star): boolean {
  const relation = star.goalRelation;

  if (!relation) return true;
  if (relation === 'exactly' && moveCount === star.moves) return true;
  if (relation === 'fewer' && moveCount <= star.moves) return true;
  if (relation === 'more' && moveCount > star.moves) return true;

  return false;
}
