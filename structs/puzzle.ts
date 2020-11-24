interface Star {
  value: number; // How many pts it is worth
  goalRelation: 'more' | 'fewer' | 'exactly';
  moves: number;
}

enum Op {
  'add', // Addition
  'sub', // Subtraction
  'mult', // Multiplication
  'div', // Division
  'pow', // Exponentiation
  'mod', // Modulus
  'fact', // Factorial
  'root', // Radical
  'floor', // Floot
  'ceil', // Ceiling
  'base', // Convert to base ____
  'collatz', // If even then halve, else * 3 + 1
  'recip', // Switch to reciprocal
  'abs', // Absolute value
  'concat', // Concat with ___
}

interface Button {
  symbol: Op;
  limit: number;
  value?: number;
}

interface Puzzle {
  id: string; // {LEVEL}_{ID} ex: A_1
  goal: number;
  start: number;
  starRequirements: Star[];
  functions: Button[];
  creator: string;
  desc?: string;
}

export const defaultPuzzle = (): Puzzle | null => null;
