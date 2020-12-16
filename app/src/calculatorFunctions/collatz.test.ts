import { OpType } from '../structs/puzzle';
import genOp from './genOpBtnTextAndOp';

const collatz = genOp({ symbol: OpType.collatz });

describe('has properties', () => {
  test('limit', () => {
    expect(collatz.limit).toBeDefined();
  });

  test('op', () => {
    expect(collatz.op).toBeDefined();
  });

  test('text', () => {
    expect(collatz.text).toBeDefined();
  });
});

describe('text formatting', () => {
  test('text is reverse', () => {
    expect(collatz.text).toBe('collatz');
  });
});

describe('valid inputs', () => {
  test('0 -> 0', () => {
    expect(collatz.op(0)).toBe(0);
  });

  test('1 -> 4', () => {
    expect(collatz.op(1)).toBe(4);
  });

  test('2 -> 1', () => {
    expect(collatz.op(2)).toBe(1);
  });

  test('25 -> 76', () => {
    expect(collatz.op(25)).toBe(76);
  });

  test('100 -> 50', () => {
    expect(collatz.op(25)).toBe(76);
  });

  test('-1 -> -2', () => {
    expect(collatz.op(-1)).toBe(-2);
  });

  test('-2 -> -1', () => {
    expect(collatz.op(-2)).toBe(-1);
  });

  test('-7 -> -20', () => {
    expect(collatz.op(-7)).toBe(-20);
  });

  test('-50 -> -25', () => {
    expect(collatz.op(-50)).toBe(-25);
  });
});

describe('invalid inputs', () => {
  test('0.1 -> NaN', () => {
    expect(collatz.op(0.1)).toBe(NaN);
  });

  test('-0.1 -> NaN', () => {
    expect(collatz.op(-0.1)).toBe(NaN);
  });
});
