import { OpType } from '../structs/puzzle';
import genOp from './genOpBtnTextAndOp';

const two = genOp({ symbol: OpType.mult, value: 2 });
const negtwo = genOp({ symbol: OpType.mult, value: -2 });
const onePtThree = genOp({ symbol: OpType.mult, value: 1.3 });

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
    expect(two.text).toBe('× 2');
  });

  test('negative operand with ()', () => {
    expect(negtwo.text).toBe('× (-2)');
  });
});

describe('fixed operand is an int', () => {
  test('x int', () => {
    expect(two.op(5)).toBe(10);
  });

  test('x float', () => {
    expect(two.op(1.2)).toBe(2.4);
  });

  test('x 0', () => {
    expect(two.op(0)).toBe(0);
  });

  test('x negative int', () => {
    expect(two.op(-3)).toBe(-6);
  });

  test('x negative float', () => {
    expect(two.op(-1.2)).toBe(-2.4);
  });
});

describe('fixed operand is a float', () => {
  test('x int', () => {
    expect(onePtThree.op(3)).toBe(3.9);
  });

  test('x float', () => {
    expect(onePtThree.op(1.3)).toBe(1.69);
  });

  test('x 0', () => {
    expect(onePtThree.op(0)).toBe(0);
  });

  test('x negative int', () => {
    expect(onePtThree.op(-3)).toBe(-3.9);
  });

  test('x negative float', () => {
    expect(onePtThree.op(-1.5)).toBe(-1.95);
  });
});
