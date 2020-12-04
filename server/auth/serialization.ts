import db from '../orm/models';
import { User } from '../../app/src/structs/user';
import passport from 'passport';

passport.serializeUser(function (user: User, cb) {
  cb(null, user.authId);
});

passport.deserializeUser(async (id, cb) => {
  const user = await db.GroupUsUser.findOne({
    where: {
      authId: id,
    },
  });

  cb(null, user);
});
