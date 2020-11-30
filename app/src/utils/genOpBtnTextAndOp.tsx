import { OpType, OpInfo } from '../structs/puzzle';

interface Output {
  text: string,
  op: (prev: number) => number,
}

export default function genOpBtnTextAndOp({
  symbol, 
  value = 0, 
  limit = Infinity
  }: OpInfo): Output {

  // Used to determine when to wrap in parentheses for readability
  const isValNegative = value && value < 0
  
  switch (symbol) {
    case OpType.add: {
      const op = (prev: number) => handleFloats(prev + value);
      const text = isValNegative ? `+ (${value})` : `+ ${value}`
      return ({ text, op});
    }
    
    case OpType.sub: {
      const op = (prev: number) => handleFloats(prev - value);
      const text = isValNegative ? `- (${value})` : `- ${value}`
      return ({ text, op});
    }
    
    case OpType.mult: {
      const op = (prev: number) => handleFloats(prev * value);
      const text = isValNegative ? `× (${value})` : `× ${value}`
      return ({ text, op});
    }
    
    case OpType.div: {
      const op = (prev: number) => handleFloats(prev / value);
      const text = isValNegative ? `÷ (${value})` : `÷ ${value}`
      return ({ text, op});
    }
    
    default: 
      throw new Error('Invalid symbol passed in info.symbol')
  } 
}

// Rounds numbers for the purposes of 
function handleFloats(n: number) {
  return parseFloat(n.toPrecision(8))
}