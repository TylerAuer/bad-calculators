import { OpType } from '../structs/puzzle';
import genOp from './genOpBtnTextAndOp';

const factorial = genOp({ symbol: OpType.fact });

describe('has properties', () => {
  test('limit', () => {
    expect(factorial.limit).toBeDefined();
  });

  test('op', () => {
    expect(factorial.op).toBeDefined();
  });

  test('text', () => {
    expect(factorial.text).toBeDefined();
  });
});

describe('text formatting', () => {
  test('button text', () => {
    expect(factorial.text).toBe('n!');
  });
});

describe('Valid Inputs', () => {
  test('0!', () => {
    expect(factorial.op(0)).toBe(1);
  });

  test('1!', () => {
    expect(factorial.op(1)).toBe(1);
  });

  test('2!', () => {
    expect(factorial.op(2)).toBe(2);
  });

  test('3!', () => {
    expect(factorial.op(3)).toBe(6);
  });

  test('4!', () => {
    expect(factorial.op(4)).toBe(24);
  });

  test('5!', () => {
    expect(factorial.op(5)).toBe(120);
  });
});

describe('Invalid Outputs', () => {
  test('-1!', () => {
    expect(factorial.op(-1)).toBe(NaN);
  });

  test('-1.1!', () => {
    expect(factorial.op(-1.1)).toBe(NaN);
  });

  test('1.1!', () => {
    expect(factorial.op(1.1)).toBe(NaN);
  });

  test('0.5!', () => {
    expect(factorial.op(0.5)).toBe(NaN);
  });
});
