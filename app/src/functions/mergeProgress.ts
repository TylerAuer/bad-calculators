import { AllProgress } from '../structs/user';

/**
 * Receives two maps of User Progress and merges them.
 * Replacing values only where a nulls or falses has become a true.
 */
export default function mergeProgress(
  newProg: AllProgress,
  oldProg: AllProgress
): AllProgress {
  const returnProg: AllProgress = {}; // Update progress to PUT in DB and return

  // Copy over all of oldProg
  for (let key in oldProg) {
    returnProg[key] = oldProg[key];
  }

  // Update oldProg with new prog
  for (let key in newProg) {
    if (!returnProg[key]) {
      returnProg[key] = newProg[key];
    } else {
      // If any puzzles have been solved, they need to be converted to true in
      // the returnProg. So iterate over each T/F/null value in each newProg key's arr
      // If it's true, set the value in the returnProg to true
      for (let i = 0; i < newProg[key].length; i++) {
        if (returnProg[key][i] === undefined) {
          returnProg[key][i] = null;
        }

        if (newProg[key][i] === true) {
          returnProg[key][i] = true;
        }
      }
    }
  }

  return returnProg;
}
