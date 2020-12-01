import { NextFunction, Request, Response } from 'express';
import { totalStarCount } from '../init/syncPuzzles';

export default function getTotalStarCount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send(totalStarCount.toString());
}
