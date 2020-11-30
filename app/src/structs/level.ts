export interface Level {
  id: number;
  desc: string;
  puzIndexes: {
    id: number;
  }[];
  levelBelow: number | null;
  levelAbove: number | null;
}
