import { Request, Response, NextFunction } from 'express';
import { AllProgress } from '../../app/src/structs/user';
import { User } from '../../app/src/structs/user';
import mergeProgress from '../../app/src/functions/mergeProgress';
import db from '../orm/models';

/**
 * Overwrite the user's progress in the DB
 */
export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    res.status(404).send('Error processing user data.');
    return;
  }

  const user = req.user as User;
  const userId = user.id;

  const oldProg: AllProgress = user.progress!; // From database
  const newProg: AllProgress = req.body; // Incoming progress from client

  const mergedProg = mergeProgress(newProg, oldProg);

  db.BC_User.update({ progress: mergedProg }, { where: { id: userId } });

  res.send(mergedProg);
}
