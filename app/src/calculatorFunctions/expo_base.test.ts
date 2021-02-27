import { OpError, OpType } from '../structs/puzzle';
import genOp from './genOpBtnTextAndOp';

const powerWithBase2 = genOp({ symbol: OpType.expo_base, value: 2 });

describe('has properties', () => {
  test('limit', () => {
    expect(powerWithBase2.limit).toBeDefined();
  });

  test('op', () => {
    expect(powerWithBase2.op).toBeDefined();
  });

  test('text', () => {
    expect(powerWithBase2.text).toBeDefined();
  });
});

describe('text formatting', () => {
  test('button text', () => {
    expect(powerWithBase2.text).toBe('2^n');
  });
});

describe('handle integer exponents', () => {
  const baseOf0 = genOp({ symbol: OpType.expo_base, value: 0 });
  const baseOf3 = genOp({ symbol: OpType.expo_base, value: 3 });
  const baseOfNegative2 = genOp({ symbol: OpType.expo_base, value: -2 });

  test('0^-2 -> Error: Undefined', () => {
    expect(baseOf0.op(-2)).toBe(OpError.DIVIDE_BY_ZERO);
  });

  test('0^0 -> 1', () => {
    expect(baseOf0.op(0)).toBe(1);
  });

  test('0^10 -> 0', () => {
    expect(baseOf0.op(10)).toBe(0);
  });

  test('3^0 -> 1', () => {
    expect(baseOf3.op(0)).toBe(1);
  });

  test('3^3 -> 27', () => {
    expect(baseOf3.op(3)).toBe(27);
  });

  test('3^12 -> 531,441', () => {
    expect(baseOf3.op(12)).toBe(531441);
  });

  test('3^0.5 -> 1.7320508 (based on precision settings)', () => {
    expect(baseOf3.op(0.5)).toBe(1.7320508);
  });

  test('-2^0 -> 0', () => {
    expect(baseOfNegative2.op(0)).toBe(1);
  });

  test('-2^0 -> -1', () => {
    expect(baseOfNegative2.op(0)).toBe(1);
  });

  test('-2^2 -> 4', () => {
    expect(baseOfNegative2.op(2)).toBe(4);
  });

  test('-2^3 -> -8', () => {
    expect(baseOfNegative2.op(3)).toBe(-8);
  });
});

describe('handle decimal exponents', () => {
  const baseOf0 = genOp({ symbol: OpType.expo_base, value: 0 });
  const baseOf2 = genOp({ symbol: OpType.expo_base, value: 2 });
  const baseOf1Point1 = genOp({ symbol: OpType.expo_base, value: 1.1 });

  test('0^0.5 -> 0', () => {
    expect(baseOf0.op(0.5)).toBe(0);
  });

  test('2^0.5 -> 1.4142136 (based on precision settings)', () => {
    expect(baseOf2.op(0.5)).toBe(1.4142136);
  });

  test('1.1^0.5 -> 1.0488088 (based on precision settings)', () => {
    expect(baseOf1Point1.op(0.5)).toBe(1.0488088);
  });
});
