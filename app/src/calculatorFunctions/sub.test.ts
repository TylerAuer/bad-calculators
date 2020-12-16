import { OpType } from '../structs/puzzle';
import genOp from './genOpBtnTextAndOp';

const one = genOp({ symbol: OpType.sub, value: 1 });
const negOne = genOp({ symbol: OpType.sub, value: -1 });
const onePtTwo = genOp({ symbol: OpType.sub, value: 1.2 });

describe('has properties', () => {
  test('limit', () => {
    expect(one.limit).toBeDefined();
  });

  test('op', () => {
    expect(one.op).toBeDefined();
  });

  test('text', () => {
    expect(one.text).toBeDefined();
  });
});

describe('text formatting', () => {
  test('positive operand', () => {
    expect(one.text).toBe('- 1');
  });

  test('negative operand with ()', () => {
    expect(negOne.text).toBe('- (-1)');
  });
});

describe('fixed operand is an int', () => {
  test('- int', () => {
    expect(one.op(5)).toBe(4);
  });

  test('- float', () => {
    expect(one.op(1.2)).toBe(0.2);
  });

  test('- 0', () => {
    expect(one.op(0)).toBe(-1);
  });

  test('- negative int', () => {
    expect(one.op(-3)).toBe(-4);
  });

  test('- negative float', () => {
    expect(one.op(-1.2)).toBe(-2.2);
  });
});

describe('fixed operand is a float', () => {
  test('- int', () => {
    expect(onePtTwo.op(3)).toBe(1.8);
  });

  test('- float', () => {
    expect(onePtTwo.op(2.5)).toBe(1.3);
  });

  test('- 0', () => {
    expect(onePtTwo.op(0)).toBe(-1.2);
  });

  test('- negative int', () => {
    expect(onePtTwo.op(-3)).toBe(-4.2);
  });

  test('- negative float', () => {
    expect(onePtTwo.op(-1.5)).toBe(-2.7);
  });
});
