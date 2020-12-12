import { Request, Response, NextFunction } from 'express';
import { Track } from '../../app/src/structs/track';
import db from '../orm/models';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const track: Track = req.body;
}
