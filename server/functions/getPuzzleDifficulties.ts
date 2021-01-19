import db from '../orm/models';
import cache from '../init/initCache';

const NUMBER_OF_DIFFICULTY_GROUPS = 7;

type PuzzleDataRaw = {
  id: number;
  BC_Tracking: {
    dataValues: {
      totalAttempts: number;
      totalSuccesses: number;
      goal0EarnedCount: number;
      goal1EarnedCount: number;
      goal2EarnedCount: number;
      goal3EarnedCount: number;
      goal4EarnedCount: number;
      goal5EarnedCount: number;
      goal6EarnedCount: number;
      goal7EarnedCount: number;
    };
  };
};

interface PuzzleDifficulties {
  [key: number]: {
    ordinal: number;
    raw: number;
    discrete: number;
  } | null;
}

export default async function getPuzzleDifficulties(): Promise<PuzzleDifficulties> {
  let difficulties: PuzzleDifficulties;
  if (cache.has('difficulties')) {
    difficulties = cache.get('difficulties') as PuzzleDifficulties;
  } else {
    difficulties = await computePuzzleDifficulties();
    cache.set('difficulties', difficulties);
  }

  return difficulties;
}

async function computePuzzleDifficulties() {
  const puzzleDataRaw: PuzzleDataRaw[] = await db.BC_Puzzle.findAll({
    attributes: ['id'],
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

  const puzzleDataFlat = puzzleDataRaw.map((d) => ({
    id: d.id,
    ...d.BC_Tracking.dataValues,
  }));

  // Generate statistics for each puzzle
  const listOfPuzzleStats: any[] = [];
  let minDifficulty = Infinity;
  let maxDifficulty = -Infinity;
  let sumOfAllDifficulties = 0;
  const puzzlesWithoutDifficulty: number[] = [];

  puzzleDataFlat.forEach((puz) => {
    const puzStats = calculatePuzDifficultyStats(puz);

    if (!puzStats) {
      puzzlesWithoutDifficulty.push(puz.id);
      return;
    } else {
      // Update general stats
      minDifficulty = Math.min(minDifficulty, puzStats.goalsPerAttempt);
      maxDifficulty = Math.max(maxDifficulty, puzStats.goalsPerAttempt);
      sumOfAllDifficulties += puzStats.goalsPerAttempt;
    }

    listOfPuzzleStats.push(puzStats);
  });

  // const meanDifficulty = sumOfAllDifficulties / puzzleDataFlat.length;
  // const rangeOfDifficulty = maxDifficulty - minDifficulty;

  // Sort with easiest puzzles first
  listOfPuzzleStats.sort((a, b) => b.goalsPerAttempt - a.goalsPerAttempt);

  // Holder of difficulty map to return
  const puzzleDifficulties: PuzzleDifficulties = {};

  // Add puzzles with difficulty to map
  for (let i = 0; i < listOfPuzzleStats.length; i++) {
    const puz = listOfPuzzleStats[i];
    const puzCount = listOfPuzzleStats.length;
    const diffGroupSize = puzCount / NUMBER_OF_DIFFICULTY_GROUPS;

    puzzleDifficulties[puz.id] = {
      ordinal: puzCount - i,
      raw: puz.goalsPerAttempt,
      discrete: Math.floor(1 + i / diffGroupSize),
    };
  }

  // Add puzzles without difficulty to the map
  puzzlesWithoutDifficulty.forEach((id) => (puzzleDifficulties[id] = null));

  return puzzleDifficulties;
}

interface PuzzleStats {
  id: number;
  goalsPerAttempt: number;
}

function calculatePuzDifficultyStats(puz): PuzzleStats | null {
  // Handle puzzle that has not been solved or attempted
  // Will occur right after a puzzle is added to the DB
  if (puz.totalAttempts < 300 || puz.totalSuccesses < 100) {
    return null;
  }

  const goalCounts = [
    puz.goal0EarnedCount,
    puz.goal1EarnedCount,
    puz.goal2EarnedCount,
    puz.goal3EarnedCount,
    puz.goal4EarnedCount,
    puz.goal5EarnedCount,
    puz.goal6EarnedCount,
    puz.goal7EarnedCount,
  ].filter((count) => count !== 0);

  if (!goalCounts.length) {
    return null;
  }

  const totalGoalCount = goalCounts.reduce((prev, curr) => prev + curr);

  return {
    id: puz.id,
    goalsPerAttempt: totalGoalCount / puz.totalAttempts,
  };
}
