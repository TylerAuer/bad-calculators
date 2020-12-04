import { Request, Response, NextFunction } from 'express';
import { User } from '../../app/src/structs/user';
import db from '../orm/models';

/**
 * Load puzzle from the DB and send to user
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

  const userData = {
    first: user.first,
    pic: user.pic,
    progress: user.progress,
  };

  res.send(userData);
}
