import { Request, Response, NextFunction } from 'express';
import db from '../orm/models';

export default async function handleSignOut(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.logout();
  res.send('Successfully signed out');
}
