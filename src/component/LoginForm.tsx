import { useState } from 'react'
import Styles from './LoginForm.module.scss'
import axios from 'axios'

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      'https://cyara-test-api.vercel.app/api/login',
      {
        username,
        password
      }
    )
    return response.data
  } catch (err) {
    throw new Error('Credentials are wrong')
  }
}

const LoginForm: React.FC<{ name: string }> = ({ name }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async () => {
    try {
      login(username, password)
        .then((res) => console.log(res))
        .catch((err) => {
          setErrorMessage('Wrong credentials')
        })
      // the user will be routed to another link
    } catch (err) {
      setErrorMessage('Wrong credentials')
      return new Error('Wrong credentials x')
    }
  }

  return (
    <div className={Styles.Container}>
      <h2 style={{ textAlign: 'center' }}>{name}</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit()
        }}
        className={Styles.Form}
      >
        <div className={Styles.InputField}>
          <label htmlFor="username">Username:</label>
          <input
            style={{ width: '100%' }}
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="false"
          />
        </div>
        <div className={Styles.InputField}>
          <label htmlFor="password">Password</label>
          <input
            style={{ width: '100%' }}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="false"
          />
        </div>
        <p style={{ color: 'red' }}>{errorMessage}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
