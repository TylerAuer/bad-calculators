import { AllProgress } from '../structs/user';
import mergeProgress from './mergeProgress';

describe('handle empty objects', () => {
  const empty: AllProgress = {};

  const basic: AllProgress = {
    0: [null, null, true],
    1: [null, null, null],
    2: [true, null, true],
  };

  test('empty new progress', () => {
    expect(mergeProgress(empty, basic)).toEqual(basic);
  });

  test('empty old progress', () => {
    expect(mergeProgress(basic, empty)).toEqual(basic);
  });

  test('empty both', () => {
    expect(mergeProgress(empty, empty)).toEqual(empty);
  });
});

test('merge no overlap', () => {
  expect(
    mergeProgress(
      {
        1: [true],
        2: [null],
        3: [null, true, null],
      },
      {
        0: [true],
        4: [null],
      }
    )
  ).toEqual({
    0: [true],
    1: [true],
    2: [null],
    3: [null, true, null],
    4: [null],
  });
});

test('merge with overlap', () => {
  expect(
    mergeProgress(
      {
        1: [true],
        2: [null],
        3: [null, true, null],
      },
      {
        0: [true],
        1: [null],
        3: [true, null],
        4: [null],
      }
    )
  ).toEqual({
    0: [true],
    1: [true],
    2: [null],
    3: [true, true, null],
    4: [null],
  });
});

test('complex merge', () => {
  expect(
    mergeProgress(
      {
        0: [true, null],
        1: [null, true],
        3: [null, null],
        4: [true, true, true],
      },
      {
        0: [null, true, true],
        1: [true, null],
        3: [null, true, true],
        4: [null],
      }
    )
  ).toEqual({
    0: [true, true, true],
    1: [true, true],
    3: [null, true, true],
    4: [true, true, true],
  });
});
