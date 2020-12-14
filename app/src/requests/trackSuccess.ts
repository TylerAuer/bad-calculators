import { TrackSuccess } from '../structs/track';

export default async function trackSuccess(
  puzzleId: number,
  goalsMet: number[]
) {
  const data: TrackSuccess = {
    puzzleId,
    goalsMet,
  };

  const res = await fetch('/track/success', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/JSON',
    },
    body: JSON.stringify(data),
  });

  if (res.status >= 400) {
    const msg = await res.text();
    console.error('RESPONSE:', msg);
    return;
  }

  return await res.text();
}
