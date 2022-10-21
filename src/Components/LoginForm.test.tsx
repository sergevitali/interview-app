import { render, screen } from '@testing-library/react'
import LoginForm from './LoginForm'

test('renders Login Form', () => {
  render(<LoginForm />)
  expect(screen.getByLabelText('Firstname')).toBeInTheDocument()
  expect(screen.getByLabelText('Password')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
})
