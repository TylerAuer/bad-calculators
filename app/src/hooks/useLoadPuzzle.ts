import { Puzzle } from '../structs/puzzle';
import { PuzProgress } from '../structs/user';
import { puzzle, puzzleStates } from '../state/puzzle';

import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userInfo } from '../state/user';

import puzzleData from '../puzzles.json';

interface PuzData {
  [key: string]: Puzzle;
}

export default function useLoadPuzzle(id: string) {
  const setPuz = useSetRecoilState(puzzle);
  const setPuzStates = useSetRecoilState(puzzleStates);
  const [user, setUser] = useRecoilState(userInfo);

  // Load puzzle data and assign type
  const puzzleList = puzzleData as PuzData;

  useEffect(() => {
    const currentPuz = puzzleList[id];

    setPuz(currentPuz); // Load puzzle into state
    setPuzStates([{ val: currentPuz.start, limits: [] }]); // Load initial state

    // Check if the user has the details in the progress
    if (!user.progress[id]) {
      // Generate star progress for this user
      let initProgressCurrPuz = {
        stars: {},
      } as PuzProgress;
      currentPuz.stars.forEach((s) => {
        initProgressCurrPuz.stars[s.value.toString()] = false;
      });

      setUser((prev) => ({
        ...prev,
        progress: {
          ...prev.progress,
          [id]: initProgressCurrPuz,
        },
      }));
    }
  }, [id, puzzleList, setPuz, setPuzStates, setUser, user]);
}
