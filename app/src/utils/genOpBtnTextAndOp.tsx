import { OpType, OpInfo } from '../structs/puzzle';

interface Output {
  text: string,
  op: (prev: number) => number,
}

export default function genOpBtnTextAndOp(info: OpInfo): Output {

  switch (info.symbol) {
    case (OpType.add):
      const add = (prev: number) => prev + (info.value as number);
      return ({ text: `+ ${info.value}`, op: add});
    
    case (OpType.sub):
      const sub = (prev: number) => prev - (info.value as number);
      return ({ text: `- ${info.value}`, op: sub});
    }
    
    throw new Error('Invalid symbol passed in info.symbol')
  }