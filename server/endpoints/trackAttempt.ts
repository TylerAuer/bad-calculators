import { Request, Response, NextFunction } from 'express';
import { TrackAttempt } from '../../app/src/structs/track';
import db from '../orm/models';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { puzzleId } = req.body as TrackAttempt;

  db.BC_Tracking.increment('totalAttempts', {
    where: { BCPuzzleId: puzzleId },
  });

  res.send(`Logged attempt on puzzle: ${puzzleId}`);
}
