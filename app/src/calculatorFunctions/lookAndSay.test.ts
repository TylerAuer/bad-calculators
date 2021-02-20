import { OpError, OpType } from '../structs/puzzle';
import genOp from './genOpBtnTextAndOp';

const las = genOp({ symbol: OpType.look_and_say });

describe('has properties', () => {
  test('limit', () => {
    expect(las.limit).toBeDefined();
  });

  test('op', () => {
    expect(las.op).toBeDefined();
  });

  test('text', () => {
    expect(las.text).toBeDefined();
  });
});

describe('text formatting', () => {
  test('text is "Look & Say"', () => {
    expect(las.text).toBe('Look & Say');
  });
});

describe('valid inputs', () => {
  test('0 -> 10', () => {
    expect(las.op(0)).toBe(10);
  });

  test('-30 -> -1310', () => {
    expect(las.op(-30)).toBe(-1310);
  });

  test('4 -> 14', () => {
    expect(las.op(4)).toBe(14);
  });

  test('22 -> 22', () => {
    expect(las.op(22)).toBe(22);
  });

  test('54322 -> 15141322', () => {
    expect(las.op(54322)).toBe(15141322);
  });

  test('333333333 -> 93', () => {
    expect(las.op(333333333)).toBe(93);
  });

  test('33344533 -> 33241523', () => {
    expect(las.op(33344533)).toBe(33241523);
  });

  test('1111111111 -> 101', () => {
    expect(las.op(1111111111)).toBe(101);
  });
});

describe('invalid inputs', () => {
  test('0.1 -> NaN', () => {
    expect(las.op(0.1)).toBe(OpError.LOOK_AND_SAY_DECIMAL);
  });
});
