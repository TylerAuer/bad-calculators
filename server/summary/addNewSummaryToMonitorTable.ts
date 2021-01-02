import db from '../orm/models';

export default async function addNewSummaryToMonitorTable() {
  const countOfUsers = await db.BC_User.count();
  const totalAttempts = await db.BC_Tracking.sum('totalAttempts');
  const totalSuccesses = await db.BC_Tracking.sum('totalSuccesses');

  const puzzleData = await db.BC_Puzzle.findAll({
    attributes: ['id', 'level', 'indexInLevel'],
    include: {
      model: db.BC_Tracking,
      attributes: [
        'totalAttempts',
        'totalSuccesses',
        'goal0EarnedCount',
        'goal1EarnedCount',
        'goal2EarnedCount',
        'goal3EarnedCount',
        'goal4EarnedCount',
        'goal5EarnedCount',
        'goal6EarnedCount',
        'goal7EarnedCount',
      ],
    },
  });

  const newSummary = await db.BC_Monitor.create({
    totalAttemptsAtTimeOfLog: totalAttempts,
    totalSuccessesAtTimeOfLog: totalSuccesses,
    userCountAtTimeOfLog: countOfUsers,
    puzzleDataAtTimeOfLog: puzzleData,
  });

  return newSummary;
}
