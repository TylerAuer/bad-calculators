import { Request, Response, NextFunction } from 'express';
import { User } from '../../app/src/structs/user';
import db from '../orm/models';

/**
 * Load user's progress
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

  const { id } = req.user as User;

  const progress = await db.BC_User.findOne({
    where: { id: id },
    attributes: ['progress'],
  });

  res.send(progress);
}
