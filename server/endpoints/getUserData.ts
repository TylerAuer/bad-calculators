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

  // TODO: fix the typing issues here. Something about the Express / PassportJS
  // user isn't registering correctly.
  // The ! modifier doesn't seem to work either

  const userData = {
    first: req.user.first,
    pic: req.user.pic,
    progress: req.user.progress,
  };

  res.send(userData);
}
