import { Request, Response, NextFunction } from 'express';
import { levels } from '../../levels';
import db from '../orm/models';

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

  const puzList = await db.BC_Puzzle.findAll({
    where: {
      level: id,
    },
    order: [['indexInLevel', 'ASC']],
    attributes: ['id'],
  });

  levelData.puzIndexes = puzList;

  levelData
    ? res.send(levelData)
    : res.status(404).send('Level does not exist');
}
