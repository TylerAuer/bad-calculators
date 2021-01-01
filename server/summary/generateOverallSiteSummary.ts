import db from '../orm/models';
import { EmailStyles } from './emailStyles';
import { Update } from '../../app/src/structs/update';

export default async function generateOverallSiteSummary(
  prev: Update,
  next: Update
): Promise<string> {
  return `
  <div ${EmailStyles.MajorHeading}>Site Summary</div>
    ${genDataRow(
      'Accounts',
      next.userCountAtTimeOfLog,
      next.userCountAtTimeOfLog - prev.userCountAtTimeOfLog
    )}
    ${genDataRow(
      'Puzzles',
      next.puzzleDataAtTimeOfLog.length,
      next.puzzleDataAtTimeOfLog.length - prev.puzzleDataAtTimeOfLog.length
    )}
    ${genDataRow(
      'Attempts',
      next.totalAttemptsAtTimeOfLog,
      next.totalAttemptsAtTimeOfLog - prev.totalAttemptsAtTimeOfLog
    )}
    ${genDataRow(
      'Successes',
      next.totalSuccessesAtTimeOfLog,
      next.totalSuccessesAtTimeOfLog - prev.totalSuccessesAtTimeOfLog
    )}
    ${genDataRow(
      'Failures',
      next.totalAttemptsAtTimeOfLog - next.totalSuccessesAtTimeOfLog,
      next.totalAttemptsAtTimeOfLog -
        next.totalSuccessesAtTimeOfLog -
        (prev.totalAttemptsAtTimeOfLog - prev.totalSuccessesAtTimeOfLog)
    )}
  </div>
  `;
}

function genDataRow(title: string, currentVal: number, change: number): string {
  const hasChanged = change > 0;

  return `
  <div>
    <b>${title}</b>: ${currentVal.toLocaleString()} 
    ${hasChanged ? `(+ ${change.toLocaleString()})` : ''}
  </div>
  `;
}
