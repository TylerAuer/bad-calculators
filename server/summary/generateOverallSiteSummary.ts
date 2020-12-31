import db from '../orm/models';

export default async function generateOverallSiteSummary(): Promise<string> {
  const countOfPuzzles = await db.BC_Puzzle.count();
  const countOfUsers = await db.BC_User.count();
  const totalAttempts = await db.BC_Tracking.sum('totalAttempts');
  const totalSuccesses = await db.BC_Tracking.sum('totalSuccesses');

  return `
  <h2>Site Summary</h2>
  <ul>
    <li><b>Puzzles:</b> ${countOfPuzzles}</li>
    <li><b>Registered Users:</b> ${countOfUsers}</li>
    <li><b>Attempts:</b> ${totalAttempts}</li>
    <li><b>Successes:</b> ${totalSuccesses}</li>
    <li><b>Failures:</b> ${totalAttempts - totalSuccesses}</li>
  </ul>
  <hr/>
  `;
}
