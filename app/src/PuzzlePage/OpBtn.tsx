import { OpInfo } from '../structs/puzzle';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { redoStates, puzzleStates, puzzle } from '../state/puzzle';
import genOpBtnTextAndOp from '../calculatorFunctions/genOpBtnTextAndOp';
import CalcBtn from './CalcBtn';
import { progress, signInState } from '../state/user';
import { AllProgress, SignInStatus } from '../structs/user';
import mergeProgress from '../functions/mergeProgress';
import saveProgressToServer from '../functions/saveProgressToServer';

interface Props {
  info: OpInfo;
  index: number;
}

export default function OpBtn({ info, index }: Props) {
  const puz = useRecoilValue(puzzle);
  const [puzStates, setPuzStates] = useRecoilState(puzzleStates);
  const setRedoStates = useSetRecoilState(redoStates);
  const [prog, setProg] = useRecoilState(progress);
  const signIn = useRecoilValue(signInState);

  const { text, op, limit } = genOpBtnTextAndOp(info);

  // Add state to puzStates Stack
  const handleClick = async () => {
    // Don't allow user to click operation buttons if the current state is
    // a string. Because if it is a string, it is an error msg
    if (typeof puzStates[puzStates.length - 1].val !== 'number') return;

    const nextVal = op(puzStates[puzStates.length - 1].val as number);

    setPuzStates((prev) => {
      const next = {
        ...prev[prev.length - 1],
        val: nextVal,
        counts: [...prev[prev.length - 1].counts],
        historyString: prev[prev.length - 1].historyString + ' ' + text,
      };

      // Increment the counter that tracks button presses
      next.counts[index]++;

      return [...prev, next];
    });

    // Clear future since you've gone down a new branch of the timeline
    setRedoStates([]);

    // Trigger save if reached target
    if (puz && nextVal === puz.target) {
      // Count moves made
      const moves = puzStates.length;

      // Determine stars earned
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

      // Update progress locally
      const updatedLocalProg: AllProgress = { ...prog };

      // Make new copy of the current puzzles array if it exists or generate
      // a new array for it
      if (updatedLocalProg[puz.id]) {
        updatedLocalProg[puz.id] = [...prog[puz.id]];
      } else {
        updatedLocalProg[puz.id] = [];
      }

      goalsMet.forEach((goalIdx) => {
        updatedLocalProg[puz.id][goalIdx] = true;
      });

      // Set state for updated local progress
      setProg(updatedLocalProg);

      if (signIn === SignInStatus.SIGNED_IN) {
        // Save progress to server if the user is signed in
        const mergedProgFromServer = await saveProgressToServer(
          updatedLocalProg
        );
        // Update state with merged progress returned from the server
        setProg(mergedProgFromServer);
      } else if (signIn === SignInStatus.OPTED_OUT) {
        // Save progress to localStorage if the user is not signed into an account
        const store = window.localStorage;
        const progressStringFromStore = store.getItem('progress') || '{}';
        const progressFromStore = JSON.parse(progressStringFromStore);

        const mergedProgress = mergeProgress(
          updatedLocalProg,
          progressFromStore
        );

        store.setItem('progress', JSON.stringify(mergedProgress));
      }
    }
  };

  const usesLeft = limit - puzStates[puzStates.length - 1].counts[index];

  return <CalcBtn onClick={handleClick} text={text} usesLeft={usesLeft} />;
}
