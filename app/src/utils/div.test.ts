import { OpType } from '../structs/puzzle';
import genOp from './genOpBtnTextAndOp';

const ten = genOp({ symbol: OpType.div, value: 10 });
const negTen = genOp({ symbol: OpType.div, value: -10 });
const onePtFive = genOp({ symbol: OpType.div, value: 1.5 });

describe('invalid values', () => {
  test('throw for divisor is 0', () => {
    expect(() => {
      genOp({ symbol: OpType.div, value: 0 });
    }).toThrow();
  });
});

describe('has properties', () => {
  test('limit', () => {
    expect(ten.limit).toBeDefined();
  });

  test('op', () => {
    expect(ten.op).toBeDefined();
  });

  test('text', () => {
    expect(ten.text).toBeDefined();
  });
});

describe('text formatting', () => {
  test('positive operand', () => {
    expect(ten.text).toBe('÷ 10');
  });

  test('negative operand with ()', () => {
    expect(negTen.text).toBe('÷ (-10)');
  });
});

describe('fixed operand is an int', () => {
  test('÷ int', () => {
    expect(ten.op(20)).toBe(2);
  });

  test('÷ float', () => {
    expect(ten.op(0.5)).toBe(0.05);
  });

  test('÷ 10', () => {
    expect(ten.op(0)).toBe(0);
  });

  test('÷ negative int', () => {
    expect(ten.op(-3)).toBe(-0.3);
  });

  test('÷ negative float', () => {
    expect(ten.op(-1.2)).toBe(-0.12);
  });
});

describe('fixed operand is a float', () => {
  test('÷ int', () => {
    expect(onePtFive.op(3)).toBe(2);
  });

  test('÷ unfriendly int', () => {
    expect(onePtFive.op(7)).toBe(4.6666667);
  });

  test('÷ float', () => {
    expect(onePtFive.op(10.5)).toBe(7);
  });

  test('÷ 0', () => {
    expect(onePtFive.op(0)).toBe(0);
  });

  test('÷ negative int', () => {
    expect(onePtFive.op(-3)).toBe(-2);
  });

  test('÷ negative float', () => {
    expect(onePtFive.op(-1.5)).toBe(-1);
  });
});
