import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

test('renders App', async () => {
  render(<App />)
  await waitFor(() => {
    const h1Element = screen.getByText('This is an app')
    expect(h1Element).toBeInTheDocument()
  })
  const buttonElement = screen.getByRole('button', {
    name: 'Login Form Toggle'
  })
  expect(buttonElement).toBeInTheDocument()
})
