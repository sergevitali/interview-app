import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ComponentWithClass, {
  Button,
  ComponentWithClassProps,
  State
} from './ComponentWithClass'

const props: ComponentWithClassProps = {
  name: 'test name',
  description: 'description for testing'
}

const initialState: State = {
  count: 0,
  anArray: []
}

describe('counter element', () => {
  test('renders component', () => {
    render(<ComponentWithClass {...props} {...initialState} />)
    expect(screen.getByText('test name')).toBeInTheDocument()
    expect(screen.getByText('test name')).toHaveStyle(
      'background-color : yellowgreen'
    )
    expect(screen.getByText('description for testing')).toBeInTheDocument()
    expect(screen.getByText('count: 0')).toBeInTheDocument()
    expect(screen.getByTestId('counter')).toBeInTheDocument()
  })

  test('increases the value of count when user clicks increment list element', () => {
    render(<ComponentWithClass {...props} {...initialState} />)
    expect(screen.getByTestId('counter')).toBeInTheDocument()
    expect(screen.getByText('count: 0')).toBeInTheDocument()

    const incrementListItem = screen.getByTestId('increment')
    expect(screen.getByTestId('increment')).toBeInTheDocument()
    userEvent.click(incrementListItem)
    expect(screen.getByText('count: 1')).toBeInTheDocument()
  })

  test('decrement the value of count when user clicks decrement list element', () => {
    render(<ComponentWithClass {...props} {...initialState} />)
    expect(screen.getByTestId('counter')).toBeInTheDocument()
    expect(screen.getByText('count: 0')).toBeInTheDocument()

    const decrementListItem = screen.getByTestId('decrement')
    expect(screen.getByTestId('decrement')).toBeInTheDocument()
    userEvent.click(decrementListItem)
    expect(screen.getByText('count: -1')).toBeInTheDocument()
  })
})

describe('button component', () => {
  test('triggers handleCount function on click', () => {
    const handleCount = jest.fn()
    render(<Button type="+" handleCount={handleCount} />)

    const button = screen.getByRole('button', { name: '+' })
    expect(button).toBeInTheDocument()
    userEvent.click(button)
    expect(handleCount).toHaveBeenCalledTimes(1)
    expect(handleCount).toHaveBeenCalledWith(0)
  })
})
