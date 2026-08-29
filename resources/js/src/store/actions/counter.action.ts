import { increment, decrement, incrementByAmount } from '../reducers/counter.reducer';

const counterAction = {
  increment: increment,
  decrement: decrement,
  incrementByAmount: incrementByAmount,
};

export default counterAction;