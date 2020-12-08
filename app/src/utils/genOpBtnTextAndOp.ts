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

        const isNegative = prev < 0;
        if (isNegative) {
          prev *= -1;
        }

        const split = prev.toString().split('.');
        const isFloat = split.length > 1;

        if (!isFloat) {
          const rev = parseInt(split[0].split('').reverse().join(''));
          // TEST
          // console.log(prev, '-->', isNegative ? -1 * rev : rev);
          return isNegative ? -1 * rev : rev;
        } else {
          const rev = split.join('').split('').reverse(); // reverse w/o decimal
          const decimalIndex = split[0].length; // find decimal idx
          const revWithDecimal = [
            ...rev.slice(0, decimalIndex),
            '.',
            ...rev.slice(decimalIndex),
          ]; // splice decimal point back in

          // convert to float
          const revFloat = parseFloat(revWithDecimal.join(''));

          // TEST
          // console.log(prev, '-->', isNegative ? -1 * revFloat : revFloat);
          return isNegative ? -1 * revFloat : revFloat;
        }
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
