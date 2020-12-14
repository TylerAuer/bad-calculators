# Bad Calculators

Extremely puzzling and unhelpful devices

## Description

[Bad Calculators](https://www.badcalculators.com/#/) is a collection of puzzles. Each puzzle has a start and target number which you must reach by pushing buttons on a calculator. But, these aren't normal calculators, they only have a few buttons.

## Road Map

### Features

- Customize stars and SuccessModal message based on result
- Animate stars for success modal
- Stats page with overall difficulty of puzzles
- Handle NaN returns from functions
- Restyle target, moves, etc. to be clearer
- Add puzzle builder
- Log attempts and sucesses

## Ideas

- Buttons with hidden functions. So users have to deduce what the function is. Will be most fun if you play with this where start value is 2 and the output of any of the buttons is 4 because 2 + 2 = 4, 2 * 2 = 4 and 2 ^ 2 = 4.
- Buttons that change value over time. So, the first time you push the button it is +1 then +2 then +3...

## Development

`utils/pre-commit.ts` - Checks that the puzzles have unique, sequential IDs and that each level has unique, sequential `indexInLevel` attributes across that levels puzzle.

Once a puzzle is added to the DB its ID should **NEVER** change. But, the architecture allows for the changing of levels or ordering as I learn more about each puzzle's difficulty.

Ideally this script is run automatically by adding it to `git/hooks/pre-commit`. That will need to call the script like so: `node public/utils/pre-commit.js`

### Utilities

`npm run stats` - Logs total number of puzzles, puzzles by level, and number of buttons with each operation across all puzzles.

### Builds

`npm run build` - Builds both the front and backends and puts result in `public/`

### Live Development

`npm run spin` - Starts backend in watch mode for development
`npm run start` - Starts frontend in watch mode for development
