import { Request, Response, NextFunction } from 'express';
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

  const key = user.id;
  const progress = req.body;

  db.BC_User.update({ progress: progress }, { where: { id: key } });

  res.send('Updated user progres in database');
}
