import db from '../orm/models';
import passport from 'passport';
import { User } from '../../app/src/structs/user';

interface OAuth2 {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: {
    value: string;
    verified: boolean;
  }[];
  provider: string;
  photos: {
    value: string;
  }[];
}

passport.serializeUser(function (user: OAuth2, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user: User = await db.BC_User.findOne({
    where: {
      authId: id,
    },
  });

  cb(null, user);
});
