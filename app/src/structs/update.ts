interface UpdatePuzzle {
  id: number;
  level: number;
  indexInLevel: number;
  BC_Tracking: {
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
}

export interface Update {
  totalAttemptsAtTimeOfLog: number;
  totalSuccessesAtTimeOfLog: number;
  userCountAtTimeOfLog: number;
  puzzleDataAtTimeOfLog: UpdatePuzzle[];
}
