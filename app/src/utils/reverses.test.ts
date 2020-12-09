import { OpType } from '../structs/puzzle';
import genOp from './genOpBtnTextAndOp';

const rev = genOp({ symbol: OpType.reverse });

describe('has properties', () => {
  test('limit', () => {
    expect(rev.limit).toBeDefined();
  });

  test('op', () => {
    expect(rev.op).toBeDefined();
  });

  test('text', () => {
    expect(rev.text).toBeDefined();
  });
});

describe('text formatting', () => {
  test('text is reverse', () => {
    expect(rev.text).toBe('reverse');
  });
});

describe('positive inputs', () => {
  test('0 -> 0', () => {
    expect(rev.op(0)).toBe(0);
  });

  test('50 -> 50', () => {
    expect(rev.op(50)).toBe(50);
  });

  test('102 -> 201', () => {
    expect(rev.op(102)).toBe(201);
  });

  test('1234 -> 4321', () => {
    expect(rev.op(1234)).toBe(4321);
  });

  test('1234000 -> 4321000', () => {
    expect(rev.op(1234000)).toBe(4321000);
  });

  test('12.34 -> 43.21', () => {
    expect(rev.op(12.34)).toBe(43.21);
  });

  test('12.0034 -> 43.0021', () => {
    expect(rev.op(12.0034)).toBe(43.0021);
  });

  test('1200.34 -> 4300.21', () => {
    expect(rev.op(1200.34)).toBe(4300.21);
  });

  test('0.001234 -> 0.004321', () => {
    expect(rev.op(0.001234)).toBe(0.004321);
  });

  test('0.001 -> 0.001', () => {
    expect(rev.op(0.001)).toBe(0.001);
  });
});

describe('negative inputs', () => {
  test('-12 -> -21', () => {
    expect(rev.op(-12)).toBe(-21);
  });

  test('-0.001234 -> -0.004321', () => {
    expect(rev.op(-0.001234)).toBe(-0.004321);
  });
});
