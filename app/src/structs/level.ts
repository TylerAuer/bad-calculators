import { Star } from './puzzle';

export interface Level {
  id: number;
  desc: string;
  puzIndexes: {
    id: number;
    stars: Star[];
  }[];
  levelBelow: number | null;
  levelAbove: number | null;
}
