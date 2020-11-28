import { Request, Response, NextFunction } from 'express';
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

  const puz = await db.BC_Puzzle.findByPk(id);

  puz ? res.send(puz) : res.status(404).send(`Puzzle ${id} does not exist`);
}
