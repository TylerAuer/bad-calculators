import { AllProgress } from '../structs/user';

export default async function saveUserProgress(progress: AllProgress) {
  const res = await fetch('/user/save-progress', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/JSON',
    },
    body: JSON.stringify(progress),
  });

  if (res.status >= 400) {
    console.error('Error saving user progress');
  }

  return await res.json();
}
