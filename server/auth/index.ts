import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

// Serialization functions for PassportJS
require('./serialization');

// Initialize PassportJS Strategies
require('./google');

// Redirect after auth process
const successUrl = '/#/level/1';
const failureUrl = '/';

// Authorizaitons
export const googleAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next
  );
};

// Callbacks
export const googleCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('google', {
    successRedirect: successUrl,
    failureRedirect: failureUrl,
  })(req, res, next);
};

module.exports = { googleAuth, googleCallback };
