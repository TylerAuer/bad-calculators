import { AllProgress } from '../structs/user';

export default async function saveProgressToServer(progress: AllProgress) {
  // Send progress to server and gets back merged progress. This could
  // be different if the user has the app open on different devices
  // So update local state with the merged progress that is returned from
  // the server.
  const res = await fetch('user/save-progress', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/JSON',
    },
    body: JSON.stringify(progress),
  });

  if (res.status >= 400) {
    console.error('Error saving user progress');
    return progress;
  } else {
    const mergedProgressFromServer = await res.json();
    return mergedProgressFromServer;
  }
}
