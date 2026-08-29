import { useSelector, useDispatch } from 'react-redux'
import counterAction from '../../store/actions/counter.action'

export default function Counter() {
  const count = useSelector((state: any) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment +10"
          onClick={() => dispatch(counterAction.incrementByAmount(10))}
        >
          Increment +10
        </button>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(counterAction.increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(counterAction.decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Decrement +10"
          onClick={() => dispatch(counterAction.incrementByAmount(-10))}
        >
          Decrement +10
        </button>
      </div>
    </div>
  )
}