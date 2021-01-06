import { OpType } from '../structs/puzzle';
import genOp from './genOpBtnTextAndOp';

const powerOf2 = genOp({ symbol: OpType.expo_power, value: 2 });

describe('has properties', () => {
  test('limit', () => {
    expect(powerOf2.limit).toBeDefined();
  });

  test('op', () => {
    expect(powerOf2.op).toBeDefined();
  });

  test('text', () => {
    expect(powerOf2.text).toBeDefined();
  });
});

describe('text formatting', () => {
  test('button text', () => {
    expect(powerOf2.text).toBe('n^2');
  });
});

describe('valid Inputs', () => {
  const powerOf0 = genOp({ symbol: OpType.expo_power, value: 0 });
  const powerOf3 = genOp({ symbol: OpType.expo_power, value: 3 });
  const powerOfNegative2 = genOp({ symbol: OpType.expo_power, value: -2 });

  test('0^0 -> 1', () => {
    expect(powerOf0.op(0)).toBe(1);
  });

  test('12^0 -> 1', () => {
    expect(powerOf0.op(12)).toBe(1);
  });

  test('0^2 -> 0', () => {
    expect(powerOf2.op(0)).toBe(0);
  });

  test('2^2 -> 4', () => {
    expect(powerOf2.op(2)).toBe(4);
  });

  test('-2^2 -> 4', () => {
    expect(powerOf2.op(-2)).toBe(4);
  });

  test('-2^3 -> -8', () => {
    expect(powerOf3.op(-2)).toBe(-8);
  });

  test('10^(-2) -> 0.01', () => {
    expect(powerOfNegative2.op(10)).toBe(0.01);
  });
});

describe('invalid settings in puzzle', () => {
  test('throw error for decimal exponent', () => {
    expect(() => {
      genOp({ symbol: OpType.expo_power, value: 1.4 });
    }).toThrow();
  });
});
