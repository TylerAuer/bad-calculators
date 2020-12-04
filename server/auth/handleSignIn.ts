import db from '../orm/models';

export default async function handleSignIn(profile) {
  const userLookup = await db.BC_User.findOrCreate({
    where: { authId: profile.id },
    defaults: {
      first: profile.name.givenName,
      last: profile.name.familyName,
      authId: profile.id,
      pic: profile.photos[0].value,
      email: profile.emails[0].value,
      progress: {},
    },
  });

  const isNewUser = userLookup[1]; // true if new user

  // if (!isNewUser) {
  //   // Update name email etc.
  //   console.log('Call handleNewUser');
  // }
  // TODO: For returning user: check for updates to name, email, and profile pic
}
