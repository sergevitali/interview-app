import React from 'react'
import Styles from './ComponentWithClass.module.scss'

const myList: string[] = ['increment', 'decrement', 'clean']

export type ComponentWithClassProps = {
  name: string
  description: string
}

export type State = {
  count: number
  anArray: []
}

class ComponentWithClass extends React.Component<
  ComponentWithClassProps,
  State
> {
  constructor(props: ComponentWithClassProps) {
    super(props)
    this.state = {
      count: 0,
      anArray: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (indx: number) => {
    if (indx === 0) {
      this.setState((state) => ({ ...state, count: state.count + 1 }))
    } else if (indx === 1) {
      this.setState((state) => ({ count: state.count - 1 }))
    } else this.setState({ count: 0 })
  }

  render() {
    return (
      <div className={Styles.container}>
        <h1 data-testid="name" style={{ backgroundColor: 'yellowgreen' }}>
          {this.props.name}
        </h1>
        <h5>{this.props.description}</h5>
        <ul>
          {myList.map((item, indx) => (
            <li
              data-testid={item}
              key={indx}
              onClick={(event) => {
                event.preventDefault()
                this.handleClick(indx)
              }}
            >
              {item}
            </li>
          ))}
        </ul>
        {['+', '-'].map((buttonType, index) => (
          <Button
            key={index}
            type={buttonType}
            handleCount={(value) => this.handleClick(value)}
          />
        ))}

        <div data-testid="counter">{`count: ${this.state.count}`}</div>
      </div>
    )
  }
}

export const Button: React.FunctionComponent<{
  type: string
  handleCount: (value: number) => void
}> = ({ type, handleCount }) => {
  return (
    <span>
      <button
        onClick={(event) => {
          event.preventDefault()
          type === '+' ? handleCount(0) : handleCount(1)
        }}
      >
        {type}
      </button>
    </span>
  )
}

export default ComponentWithClass
