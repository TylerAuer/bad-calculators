import { parse } from 'path';
import { OpType, OpInfo } from '../structs/puzzle';

interface Output {
  text: string;
  op: (prev: number) => number;
  limit: number;
}

/**
 * Generates unary operations which are used to update the calculators screen
 */
export default function genOpBtnTextAndOp({
  symbol,
  // Some ops don't include another operand (like factorial)
  // So assign default values to avoid annoying type checking in all others
  value = 0,
  limit = Infinity,
}: OpInfo): Output {
  // Used to determine when to wrap in parentheses for readability
  const isValNegative = value && value < 0;

  // TODO: Add overflow error for when numbers have > 8 digits. Or something
  // like that.

  switch (symbol) {
    case OpType.add: {
      const op = (prev: number) => handleFloats(prev + value);
      const text = isValNegative ? `+ (${value})` : `+ ${value}`;
      return { text, op, limit };
    }

    case OpType.sub: {
      const op = (prev: number) => handleFloats(prev - value);
      const text = isValNegative ? `- (${value})` : `- ${value}`;
      return { text, op, limit };
    }

    case OpType.mult: {
      const op = (prev: number) => handleFloats(prev * value);
      const text = isValNegative ? `× (${value})` : `× ${value}`;
      return { text, op, limit };
    }

    case OpType.div: {
      if (value === 0) {
        throw new Error('Tried to divide by 0 in puzzle definition');
      }

      const op = (prev: number) => handleFloats(prev / value);
      const text = isValNegative ? `÷ (${value})` : `÷ ${value}`;
      return { text, op, limit };
    }

    case OpType.mod: {
      if (value <= 0 || value % 1 !== 0) {
        throw new Error(`Mod values must be whole numbers. You tried ${value}`);
      }

      const op = (prev: number) => handleFloats(prev % value);
      const text = `mod ${value}`;
      return { text, op, limit };
    }

    /**
     * Reverses the digits. Negatives maintain negative signs. Place values do
     * not change. Examples help:
     *
     * 1234 --> 4321
     * 1.234 --> 4.321
     * -12 --> -21
     * 0.001234 --> 0.004321
     */
    case OpType.reverse: {
      const op = (prev: number) => {
        if (prev === 0) return 0;

        // Determine if negative and then remove negative for easier parsing
        const isNegative = prev < 0;
        if (isNegative) {
          prev *= -1;
        }

        // Get index of decimal point and then remove the decimal point
        const split = prev.toString().split('.');
        const isFloat = split.length > 1;
        let decimalPtIdx: number | null = null;
        if (isFloat) decimalPtIdx = split[0].length;

        // Digits is the original number without a negative sign or decimal
        const digits = split.join('');

        // Get indexes of the first and last non-zero digits so the digits
        // between can be reversed
        const firstNonZeroIdx = digits.search(/[1-9]/);
        const lastNonZeroIdx =
          digits.length -
          1 -
          digits.split('').reverse().join('').search(/[1-9]/);

        // Reverse digits between first + lastNonZeros and combine with
        // any 0s before or after
        const before = digits.slice(0, firstNonZeroIdx);
        const reversedDigits = digits
          .slice(firstNonZeroIdx, lastNonZeroIdx + 1)
          .split('')
          .reverse()
          .join('');
        const after = digits.slice(lastNonZeroIdx + 1);
        let rev = before + reversedDigits + after;

        // If the original number had a decimal, put it back into the number
        if (isFloat && decimalPtIdx) {
          rev = rev.slice(0, decimalPtIdx) + '.' + rev.slice(decimalPtIdx);
        }
        let revFloat = parseFloat(rev);

        // If the original number was negative, make negative
        if (isNegative) revFloat *= -1;

        return revFloat;
      };

      const text = `reverse`;
      return { text, op, limit };
    }

    default:
      throw new Error(
        'Invalid symbol passed in info.symbol of puzzle definition'
      );
  }
}

// Rounds numbers for the purposes of
function handleFloats(n: number) {
  return parseFloat(n.toPrecision(8));
}
