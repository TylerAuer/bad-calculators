# Bad Calculators

Extremely puzzling and unhelpful devices

## Description

[Bad Calculators](https://www.badcalculators.com/#/) is a collection of puzzles. Each puzzle has a start and target number which you must reach by pushing buttons on a calculator. But, these aren't normal calculators, they only have a few buttons.

## ROADMAP

- Build out unit, integration, and e2e testing
- Finish implementing all operations
- Add helper info to puzzles and operations
- Handle landing page redirects more elegently
- Handle missing or unloaded profile pic
- Change from levels to a single page of puzzles, sortable by traits
- Add Privacy Page
- Add Strategy and tips page
  - Work backwards
  - Use pencil/pen and paper
  - Draw a graph
  - Be systematic so you can learn from your fails
- Improve styling for operations (radicals and exponets)
- Add animations
- Add ability to disable puzzles
- Add lesson plan suggestions for teachers
- Add puzzle builder page

## Development

`utils/pre-commit.ts` - Checks that the puzzles have unique, sequential IDs and that each level has unique, sequential `indexInLevel` attributes across that levels puzzle.

Once a puzzle is added to the DB its ID should **NEVER** change. But, the architecture allows for the changing of levels or ordering as I learn more about each puzzle's difficulty.

Ideally this script is run automatically by adding it to `git/hooks/pre-commit`. That will need to call the script like so: `node public/utils/pre-commit.js`

### Utilities

- `npm run stats` - Logs total number of puzzles, puzzles by level, and number of buttons with each operation across all puzzles.
- `npm run solve` - Pass in a filename from the puzzle directory and the script will solve it (up to the number of moves you specify). Can be rerun after changing the files but without needing to reenter information.

### Builds

`npm run build` - Builds both the front and backends and puts result in `public/`

### Live Development

- `npm run spin` - Starts backend in watch mode for development
- `npm run start` - Starts frontend in watch mode for development
- `npm run test` - Run Jest unit tests
- `npx cypress open` - Open Cypress test manager
