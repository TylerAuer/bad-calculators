import { OpError, OpType } from '../structs/puzzle';
import genOp from './genOpBtnTextAndOp';

const two = genOp({ symbol: OpType.base, value: 2 });
const three = genOp({ symbol: OpType.base, value: 3 });
const five = genOp({ symbol: OpType.base, value: 5 });
const twenty = genOp({ symbol: OpType.base, value: 20 });

describe('invalid values', () => {
  test('throw error for decimal fixed value', () => {
    expect(() => {
      genOp({ symbol: OpType.base, value: 1.4 });
    }).toThrow();
  });

  test('throw error for bases > 36', () => {
    expect(() => {
      genOp({ symbol: OpType.base, value: 37 });
    }).toThrow();
  });

  test('throw error for bases <= 0', () => {
    expect(() => {
      genOp({ symbol: OpType.base, value: 0 });
    }).toThrow();

    expect(() => {
      genOp({ symbol: OpType.base, value: -2 });
    }).toThrow();

    expect(() => {
      genOp({ symbol: OpType.base, value: -1.2 });
    }).toThrow();
  });
});

describe('has properties', () => {
  test('limit', () => {
    expect(two.limit).toBeDefined();
  });

  test('op', () => {
    expect(two.op).toBeDefined();
  });

  test('text', () => {
    expect(two.text).toBeDefined();
  });
});

describe('text formatting', () => {
  test('positive operand', () => {
    expect(two.text).toBe('base 2');
  });
});

describe('handle integer inputs', () => {
  // Base 2
  test('1 base 2 -> 1', () => {
    expect(two.op(1)).toBe(1);
  });

  test('2 base 2 -> 10', () => {
    expect(two.op(2)).toBe(10);
  });

  test('15 base 2 -> 1111', () => {
    expect(two.op(15)).toBe(1111);
  });

  test('34 base 2 -> 100010', () => {
    expect(two.op(34)).toBe(100010);
  });

  test('-34 base 2 -> -100010', () => {
    expect(two.op(-34)).toBe(-100010);
  });

  // Base 5
  test('2 base 5 -> 2', () => {
    expect(five.op(2)).toBe(2);
  });

  test('10 base 5 -> 20', () => {
    expect(five.op(10)).toBe(20);
  });

  test('16 base 5 -> 31', () => {
    expect(five.op(16)).toBe(31);
  });

  test('-16 base 5 -> -31', () => {
    expect(five.op(-16)).toBe(-31);
  });

  // Base 20
  test('9 base 20 -> 9', () => {
    expect(twenty.op(9)).toBe(9);
  });

  test('21 base 20 -> 11', () => {
    expect(twenty.op(21)).toBe(11);
  });
});

describe('handle invalid values', () => {
  test('Returns error when output has digit that is a letter', () => {
    expect(twenty.op(11)).toBe(OpError.BASE_INVALID_DIGIT);
  });

  test('Returns error when input is not an integer', () => {
    expect(two.op(1.1)).toBe(OpError.BASE_NON_INTEGERS);
    expect(two.op(-1.1)).toBe(OpError.BASE_NON_INTEGERS);
  });
});
