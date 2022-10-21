import { render, screen } from '@testing-library/react'
import LoginForm from './LoginForm'

test('renders Login Form', () => {
  render(<LoginForm />)
  expect(screen.getByLabelText('fname')).toBeInTheDocument()
})
