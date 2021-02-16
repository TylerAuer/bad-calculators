import { OpType, OpInfo, ProcessedOp, OpError } from '../structs/puzzle';

/**
 * Generates unary operations which are used to update the calculators screen
 */
export default function genOpBtnTextAndOp({
  symbol,
  // Some ops don't include another operand (like factorial)
  // So assign default values to avoid annoying type checking in all others
  value = 0,
  limit = Infinity,
}: OpInfo): ProcessedOp {
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

      const text = 'reverse';
      return { text, op, limit };
    }

    case OpType.fact: {
      const op = (prev: number) => {
        // Only accept whole numbers and 0
        if (prev < 0 || prev % 1 !== 0) return NaN;

        let output = 1;
        while (prev > 0) {
          output *= prev--;
        }

        return output;
      };

      const text = 'n!';
      return { text, op, limit };
    }

    case OpType.collatz: {
      const op = (prev: number) => {
        if (prev % 1 !== 0) return NaN; // Only accept integers

        if (prev % 2 === 0) {
          return prev / 2;
        } else {
          return 3 * prev + 1;
        }
      };

      const text = 'collatz';
      return { text, op, limit };
    }

    case OpType.base: {
      if (value <= 0 || value % 1 !== 0) {
        throw new Error(`Bases must be whole numbers. You tried ${value}`);
      }

      if (value > 36) {
        throw new Error(`JS can't handle bases > 36. You tried ${value}`);
      }

      const op = (prev: number) => {
        if (prev % 1 !== 0) return OpError.BASE_NON_INTEGERS;

        const strInNewBase = prev.toString(value);

        // Check if result includes a letter as a digit (from a base > 10)
        if (strInNewBase.match(/[a-zA-Z]/)) {
          return OpError.BASE_INVALID_DIGIT;
        }

        return parseInt(strInNewBase);
      };

      const text = `base ${value}`;
      return { text, op, limit };
    }

    case OpType.expo_power: {
      if (value % 1 !== 0) {
        throw new Error(`Exponent must be an integer. You tried ${value}`);
      }

      const op = (prev: number) => {
        return handleFloats(prev ** value);
      };

      const text = `n^${value}`;
      return { text, op, limit };
    }

    case OpType.look_and_say: {
      const op = (prev: number) => {
        if (prev % 1 !== 0) return OpError.LOOK_AND_SAY_DECIMAL;

        const isNegative = prev < 0; // Note if number is negative
        const arr = Math.abs(prev).toString().split(''); //Split by digit

        // Group by repeated digits ( ex: 112223 -> ['111', '222', '3'] )
        const a = [];
        let prevDigit = null;
        for (let i = 0; i < arr.length; i++) {
          const currDigit = arr[i];

          currDigit === prevDigit
            ? (a[a.length - 1] += currDigit)
            : a.push(currDigit);

          prevDigit = currDigit;
        }

        // Condense group into 2-digits (count)(digit)
        const result = parseInt(
          a.map((group) => `${group.length}${group[0]}`).join(''),
          10
        );

        return isNegative ? -1 * result : result;
      };

      const text = 'Look & Say';
      return { text, op, limit };
    }

    default:
      throw new Error(
        'Invalid symbol passed in info.symbol of puzzle definition'
      );
  }
}

// Rounds numbers for precision
function handleFloats(n: number) {
  return parseFloat(n.toPrecision(8));
}
