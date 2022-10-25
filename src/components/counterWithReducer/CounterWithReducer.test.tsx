import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CounterWithReducer from './CounterWithReducer'

test('renders component', () => {
  render(<CounterWithReducer name={'Counter Test'} />)
  expect(screen.getByText('Counter Test')).toBeInTheDocument()
  expect(screen.getByText('Count: 0')).toBeInTheDocument()
})

test('increments count', () => {
  render(<CounterWithReducer name={'Counter Test'} />)
  userEvent.click(screen.getByRole('button', { name: '+' }))
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
