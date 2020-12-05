import { Request, Response, NextFunction } from 'express';
import { AllProgress } from '../../app/src/structs/user';
import { User } from '../../app/src/structs/user';
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

  const oldProg = user.progress; // From database
  const newProg = req.body; // Incoming progress from client

  const mergedProg = mergeProgress(newProg, oldProg);

  db.BC_User.update({ progress: mergedProg }, { where: { id: userId } });

  res.send(mergedProg);
}

/**
 * Receives two maps of User Progress and merges them.
 * Replacing values only where a false has become a true.
 */
function mergeProgress(
  newProg: AllProgress,
  oldProg: AllProgress
): AllProgress {
  const returnProg: AllProgress = {}; // Update progress to PUT in DB and return

  // Copy over all of oldProg
  for (let key in oldProg) {
    returnProg[key] = oldProg[key];
  }

  // Update oldProg with new prog
  for (let key in newProg) {
    if (!returnProg[key]) {
      returnProg[key] = newProg[key];
    } else {
      // If any puzzles have been solved, they need to be converted to true in
      // the returnProg. So iterate over each T/F value in each newProg key's arr
      // If it's true, set the value in the returnProg to true
      for (let i = 0; i < newProg[key].length; i++) {
        if (newProg[key][i] === true) {
          returnProg[key][i] = true;
        }
      }
    }
  }

  return returnProg;
}
