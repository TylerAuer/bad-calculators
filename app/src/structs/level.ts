export interface Level {
  id: number;
  puzzles: number[];
  desc: string;
  levelBelow: number | null;
  levelAbove: number | null;
}
