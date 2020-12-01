import { Request, Response, NextFunction } from 'express';
import { levels } from '../../puzzles/levels';
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

  if (!levelData) {
    throw new Error('Need to add level info to /puzzles/levels.ts');
  }

  const puzList = await db.BC_Puzzle.findAll({
    where: {
      level: id,
    },
    order: [['indexInLevel', 'ASC']],
    attributes: ['id', 'stars'],
  });

  levelData.puzIndexes = puzList;

  levelData
    ? res.send(levelData)
    : res.status(404).send('Level does not exist');
}
