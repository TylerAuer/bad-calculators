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
     * 50 --> 5
     * 1234 --> 4321
     * 1.234 --> 4.321
     * -12 --> -21
     * 0.001234 --> 0.4321
     */
    case OpType.reverse: {
      const op = (prev: number) => {
        if (prev === 0) return 0;

        // Determine if negative and then remove negative for easier parsing
        const isNegative = prev < 0;
        if (isNegative) {
          prev *= -1;
        }

        // Number is an integer
        if (prev % 1 === 0) {
          const rev = parseInt(prev.toString().split('').reverse().join(''));
          return isNegative ? rev * -1 : rev;
        }

        // Number has no whole part
        if (prev > 0 && prev < 1) {
          const rev = parseFloat(
            '.' + prev.toString().split('.')[1].split('').reverse().join('')
          );
          return isNegative ? rev * -1 : rev;
        }

        // Number has a whole and a decimal part
        const numAsStr = prev.toString();
        const decimalIdx = numAsStr.indexOf('.');
        const revWithoutDecimal = numAsStr
          .split('.')
          .join('')
          .split('')
          .reverse()
          .join('');
        const rev = parseFloat(
          revWithoutDecimal.slice(0, decimalIdx) +
            '.' +
            revWithoutDecimal.slice(decimalIdx)
        );

        return isNegative ? rev * -1 : rev;
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
