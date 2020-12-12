import { Request, Response, NextFunction } from 'express';
import { TrackSuccess } from '../../app/src/structs/track';
import db from '../orm/models';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { puzzleId, goals } = req.body as TrackSuccess;

  if (!goals || !goals.length) {
    res
      .status(400)
      .send(
        'Goal array was empty or was not included. You must include goals to be incremented. If the user did not meet any goals, you should not make a tracking request.'
      );

    return;
  }

  const colsToIncrement: string[] = [];
  for (let goalIndex of goals) {
    if (goalIndex > 7) {
      res.status(400).send('Maximum goal index is 7.');
      return;
    }

    colsToIncrement.push(`goal${goalIndex}EarnedCount`);
  }

  db.BC_Tracking.increment(colsToIncrement, {
    where: { BCPuzzleId: puzzleId },
  });

  res.send('Logged the goals that were met.');
}
