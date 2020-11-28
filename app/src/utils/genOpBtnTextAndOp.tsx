import { OpType, OpInfo } from '../structs/puzzle';

interface Output {
  text: string,
  op: (prev: number) => number,
}

export default function genOpBtnTextAndOp(info: OpInfo): Output {
  // Used to determine when to wrap in parentheses for readability
  const isValNegative = info.value && info.value < 0
  
  if (info.symbol === OpType.add) {
    // Addition
    const add = (prev: number) => prev + (info.value as number);
    const text = isValNegative ? `+ (${info.value})` : `+ ${info.value}`
    return ({ text, op: add});
  } else if (info.symbol === OpType.sub) {
    // Subtraction
    const sub = (prev: number) => prev - (info.value as number);
    const text = isValNegative ? `- (${info.value})` : `- ${info.value}`
    return ({ text, op: sub});
  } else if (info.symbol === OpType.mult) {
    // Multiplication
    const mult = (prev: number) => prev * (info.value as number);
    const text = isValNegative ? `× (${info.value})` : `× ${info.value}`
    return ({ text, op: mult});
  }
   
  throw new Error('Invalid symbol passed in info.symbol')
}