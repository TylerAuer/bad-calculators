import chalk from 'chalk';
import prompts from 'prompts';
import genOpBtnTextAndOp from '../app/src/calculatorFunctions/genOpBtnTextAndOp';
import { Puzzle, Star, Solution } from '../app/src/structs/puzzle';

// Whenever a solution is found, see if it "counts as a goal"
// Once all goals are found exit(0)
// If reach a certain depth without solving each goal (based on the goals) exit(1)
