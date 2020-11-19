# Bad Calculators

Maniacal puzzles built from calculators that aren't that helpful.

## Build Notes

- State should be an array with history so undo can be implemented. I don't need to keep track of the actions, just what the state is at each given button press. Reset will just push a new copy of the initial state into the history array.

## Puzzle UX

- User should be able to easily see:
  - Current number of moves
  - Current value on the calculator
  - Number of actions of each type that are left
  - History of the moves that have been made so far: "2 + 3 + 4 + 7 - 2..."
  - That they have completed the goal (modal pops up showing the number of moves)
- User should be able to act by:
  - Undoing their last action
  - Redo after undoing an action
  - Reset to the initial state for the problem
  - Click on a function and see the value change
  - Hover over a button and see a short decription of what the button does (ex: Floor function returns the first integer that is less than the current value)
  - Return to the puzzle list

## Pages

### Home

- Quick site description
- List of problems with clear distinction between finished and unfinished
- Sign in to save progress

### Build

Should build this early to make generating puzzles easier

- All supported functions, show a menu where they can add different functions and set their limits and values
- Set your own initial value and goal
- Solver
- Submit (with name, email, role (student / teacher / other), explain why it is interesting)
