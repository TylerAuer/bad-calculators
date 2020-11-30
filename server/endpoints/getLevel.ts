import { Request, Response, NextFunction } from 'express';
import { levels } from '../../levels';

/**
 * Load puzzle from the DB and send to user
 */
export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const levelData = levels[id];

  levelData
    ? res.send(levelData)
    : res.status(404).send('Level does not exist');
}
