import db from '../orm/models';

export default async function handleSignIn(profile) {
  await db.BC_User.upsert({
    authId: profile.id,
    first: profile.name.givenName,
    last: profile.name.familyName,
    pic: profile.photos[0].value,
    email: profile.emails[0].value,
  });
}
