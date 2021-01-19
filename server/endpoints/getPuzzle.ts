import { Request, Response, NextFunction } from 'express';
import getPuzzleDifficulties from '../functions/getPuzzleDifficulties';
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

  // Run requests in parallel
  const [puz, difficulty] = await Promise.all([
    db.BC_Puzzle.findByPk(id),
    getPuzzleDifficulties(),
  ]);

  if (!puz) res.status(404).send(`Puzzle ${id} does not exist`);
  if (!difficulty) res.status(404).send(`Error getting puzzle difficulty`);

  puz.dataValues.difficulty = difficulty[id];

  res.send(puz);
}
