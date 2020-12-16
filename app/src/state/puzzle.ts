import { atom, selector } from 'recoil';
import { Puzzle } from '../structs/puzzle';
import { MonitorModal } from '../structs/ui';
import trackSuccess from '../functions/trackSuccess';
import saveUserProgress from '../functions/saveUserProgress';

// SHAPES //////////////////////////////////////////////////////////////////////

interface State {
  val: number;
  counts: number[];
  historyString: string;
}

// ATOMS ///////////////////////////////////////////////////////////////////////

export const puzzle = atom({
  key: 'puzzle',
  //default: defaultPuzzle(),
  default: null as Puzzle | null,
});

export const puzzleStates = atom({
  key: 'puzzleStates',
  default: [] as State[],
});

export const redoStates = atom({
  key: 'redoStates',
  default: [] as State[],
});

// SELECTORS ///////////////////////////////////////////////////////////////////

/**
 * Loads the total number of stars in all puzzles
 */
export const totalStarsInAllPuzzles = selector({
  key: 'totalStarsInAllPuzzles',
  get: async () => {
    const response = await fetch('/stats');

    if (response.status >= 400) return null;

    const starCount = response.json();
    return starCount;
  },
});

/**
 * Watches puzzle to see if user reaches block or target number. Sends request
 * to server if user reaches target.
 *
 * Returns an object with the info needed to form the modal
 */
export const monitorPuzzle = selector({
  key: 'monitorPuzzle',
  get: ({ get }): MonitorModal => {
    const puz = get(puzzle);
    const states = get(puzzleStates);
    const closedModal = {
      open: false,
      title: '',
      message: '',
      history: '',
    };

    if (!puz || !states.length) return closedModal;

    const moves = states.length - 1;
    const currState = states[states.length - 1];
    const currVal = currState.val;
    const { target, blocks } = puz;

    if (blocks.indexOf(currVal) !== -1) {
      // Handle case where user reaches a block
      return {
        open: true,
        title: `Blocked by ${currVal}!`,
        message:
          'You must reach to the target number while avoiding the blocks shown above the calculator screen.',
        history: currState.historyString,
      };
    } else if (currVal === target) {
      // Handle case where user reaches the target
      const goalsMet: number[] = [];
      puz.stars.forEach((s, i) => {
        // Handle different goal possibilities
        if (
          !s.moves || // Handle goal with no move limit
          (s.goalRelation === 'more' && moves > s.moves) ||
          (s.goalRelation === 'exactly' && moves === s.moves) ||
          (s.goalRelation === 'fewer' && moves <= s.moves)
        ) {
          goalsMet.push(i);
        }
      });

      trackSuccess(puz.id, goalsMet);

      return {
        open: true,
        title: 'Target Reached!',
        message: `You solved this puzzle in ${moves} moves.`,
        history: currState.historyString,
      };
    } else {
      // Handle case where user isn't at the target or a block
      return closedModal;
    }
  },
});
