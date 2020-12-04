import { Request, Response, NextFunction } from 'express';

////////////////////////////////////
// Middleware for confirming someone is logged in
export default function authorize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) next();
  else res.status(401).send('Access denied. Try signing in.');
}
