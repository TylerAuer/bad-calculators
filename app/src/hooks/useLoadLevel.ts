import { Level } from '../structs/level';

import { useRecoilState } from 'recoil';
import { level } from '../state/level';

export default async function useLoadLevel(id: string) {
  const [lvl, setLvl] = useRecoilState(level);

  // If there isn't a puzzle loaded or
  // the current puzzle's id doesn't match the url param
  // then load the correct puzzle
  if (!lvl || lvl.id !== parseInt(id)) {
    // TODO: Add a check for a 404 error. If 404 redirect to 404 page
    const res = await fetch(`/level/${id}`);
    const currentLvl: Level = await res.json();

    setLvl(currentLvl); // Load puzzle into state
  }
}
