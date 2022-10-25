import React, { useReducer } from 'react'
import Styles from './CounterWithReducer.module.scss'

const buttonList = [
  { type: 'increment', value: '+' },
  { type: 'decrement', value: '-' },
  { type: 'clear', value: 'clear' }
]

type CounterProps = {
  name: string
}

type CounterState = {
  counter: number
  lastAction: lastAction
}

type CounterAction = {
  type: string
  payload?: any
}

type lastAction = 'initiated' | 'incremented' | 'decremented' | 'cleared'

const initialState: CounterState = {
  counter: 0,
  lastAction: 'initiated'
}

const counterStateReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        counter: state.counter + 1,
        lastAction: 'incremented'
      }
    case 'decrement':
      return { ...state, counter: state.counter - 1, lastAction: 'decremented' }
    case 'clear':
      return { ...state, counter: 0, lastAction: 'cleared' }
    default:
      return state
  }
}

const CounterWithReducer: React.FC<CounterProps> = ({ name }) => {
  const [counterState, counterDispath] = useReducer(
    counterStateReducer,
    initialState
  )

  return (
    <div>
      <h2>{name}</h2>
      <div className={Styles.countText}>{`Count: ${counterState.counter}`}</div>
      <div className={Styles.lastActionText}>
        Action: {counterState.lastAction}
      </div>
      {buttonList.map((button, index) => (
        <Button
          key={index}
          handleClick={() => counterDispath({ type: button.type })}
          type={button.type}
          value={button.value}
        />
      ))}
    </div>
  )
}

export const Button: React.FC<{
  type: string
  value: string
  handleClick: () => void
}> = ({ type, value, handleClick }) => {
  return (
    <button
      className={type === 'clear' ? Styles.clear : Styles.button}
      onClick={() => handleClick()}
    >
      {value}
    </button>
  )
}

export default CounterWithReducer
