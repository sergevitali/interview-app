import { render, screen } from '@testing-library/react'
import App from './App'

test('renders App', () => {
  render(<App />)
  const h1Element = screen.getByText('This is an app')
  const buttonElement = screen.getByRole('button', {
    name: 'Login Form Toggle'
  })
  expect(h1Element).toBeInTheDocument()
  expect(buttonElement).toBeInTheDocument()
})
