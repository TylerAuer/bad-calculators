import { OpType } from '../structs/puzzle';
import genOp from './genOpBtnTextAndOp';

describe('invalid values', () => {
  test('throw error for 0 fixed value', () => {
    expect(() => {
      genOp({ symbol: OpType.mod, value: 0 });
    }).toThrow();
  });

  test('throw error for negative fixed value', () => {
    expect(() => {
      genOp({ symbol: OpType.mod, value: -20 });
    }).toThrow();
  });

  test('throw error for decimal fixed value', () => {
    expect(() => {
      genOp({ symbol: OpType.mod, value: 1.4 });
    }).toThrow();
  });
});

describe('has properties', () => {
  const ten = genOp({ symbol: OpType.mod, value: 10 });

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
  const ten = genOp({ symbol: OpType.mod, value: 10 });
  test('positive operand', () => {
    expect(ten.text).toBe('mod 10');
  });
});

describe('operation outputs', () => {
  const mod5 = genOp({ symbol: OpType.mod, value: 5 });
  const mod2 = genOp({ symbol: OpType.mod, value: 2 });

  test('10 mod 5', () => {
    expect(mod5.op(10)).toBe(0);
  });

  test('11 mod 5', () => {
    expect(mod5.op(11)).toBe(1);
  });

  test('14 mod 5', () => {
    expect(mod5.op(14)).toBe(4);
  });

  test('0 mod 2', () => {
    expect(mod2.op(0)).toBe(0);
  });

  test('-21 mod 2', () => {
    expect(mod2.op(-21)).toBe(-1);
  });

  test('1.3 mod 2', () => {
    expect(mod2.op(1.3)).toBe(1.3);
  });

  test('-1.3 mod 2', () => {
    expect(mod2.op(-1.3)).toBe(-1.3);
  });
});
