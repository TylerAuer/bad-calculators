import { TrackAttempt } from '../structs/track';

export default async function trackAttempt(puzzleId: number) {
  console.log('Track attempt');
  const data: TrackAttempt = {
    puzzleId,
  };

  const res = await fetch('/track/attempt', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/JSON',
    },
    body: JSON.stringify(data),
  });

  if (res.status >= 400) {
    const msg = await res.json();
    console.error('RESPONSE:', msg);
    return;
  }

  return await res.json();
}
