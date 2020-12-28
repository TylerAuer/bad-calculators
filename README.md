# Bad Calculators

Extremely puzzling and unhelpful devices

## Description

[Bad Calculators](https://www.badcalculators.com/#/) is a collection of puzzles. Each puzzle has a start and target number which you must reach by pushing buttons on a calculator. But, these aren't normal calculators, they only have a few buttons.

## To Do

### Maintenance + DevOps

- Refactor `npm run spin` script to wait until server is built before starting watch modes
- Add Google Analytics
- Set up daily email summaries
- Run tests that test solutions
- Add pathway to use without configuring account
- Make findSolutions a script that asks for file name on command line so I can stop checking in changes to the script
- Extract API paths to an interface so it only needs to be changed in one location
- Walk through code for opportunities to simplify / refactor to make code more DRY and orthoganal
- Add integration tests

### UI + Puzzles

- Animate stars for success modal
- Stats page with overall difficulty of puzzles
- Handle NaN returns from functions so puzzles can use this as a feature
- Add local storage solution for account
- Add puzzle builder
- Add tooltips or similar for non-arithmetic operations
- Handle puzzles marked as "disabled"
- Custom CSS (colors) for each level
- Make it so you can't highlight text in ResolveModal

### Bugs

- Handle NaN
- Improve precision of floating point arithmetic

## Ideas

- Buttons with hidden functions. So users have to deduce what the function is. Will be most fun if you play with this where start value is 2 and the output of any of the buttons is 4 because 2 + 2 = 4, 2 * 2 = 4 and 2 ^ 2 = 4.
- Buttons that change value over time. So, the first time you push the button it is +1 then +2 then +3...

## Development

`utils/pre-commit.ts` - Checks that the puzzles have unique, sequential IDs and that each level has unique, sequential `indexInLevel` attributes across that levels puzzle.

Once a puzzle is added to the DB its ID should **NEVER** change. But, the architecture allows for the changing of levels or ordering as I learn more about each puzzle's difficulty.

Ideally this script is run automatically by adding it to `git/hooks/pre-commit`. That will need to call the script like so: `node public/utils/pre-commit.js`

### Utilities

- `npm run stats` - Logs total number of puzzles, puzzles by level, and number of buttons with each operation across all puzzles.
- `npm run solve` - Solve the problem imported in /puzzles/findSolutions.ts

### Builds

`npm run build` - Builds both the front and backends and puts result in `public/`

### Live Development

- `npm run spin` - Starts backend in watch mode for development
- `npm run start` - Starts frontend in watch mode for development
- `npm run test` - Run Jest unit tests
