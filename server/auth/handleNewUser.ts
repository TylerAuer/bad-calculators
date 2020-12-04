import db from '../orm/models';
const handleNewUser = require('./handleNewUser');

module.exports = async function handleSignIn(profile) {
  const userLookup = await db.GroupUsUser.findOrCreate({
    where: { google_id: profile.id },
    defaults: {
      google_id: profile.id,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email: profile.emails[0].value,
      profile_pic: profile.photos[0].value,
    },
  });

  const isNewUser = userLookup[1]; // true if new user

  if (isNewUser) {
    // handleNewUser(userLookup[0]);
    console.log('Call handleNewUser');
  }
  // TODO: For returning user: check for updates to name, email, and profile pic
};
