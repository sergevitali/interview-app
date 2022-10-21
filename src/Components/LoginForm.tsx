import { Box, Button } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import './LoginForm.scss'

const LoginForm: React.FC<{}> = () => {
  const [firstname, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string | null>(null)
  const disabledButton = password.length < 5 || firstname.length < 5

  const submit = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (firstname === 'serap' && password === '12345') {
          resolve(true)
        } else {
          reject(new Error('incorrect credentials'))
        }
      }, 2000)
    })
  }

  const handleSubmit = async () => {
    try {
      await submit().then((response) => {
        setName('')
        setPassword('')
        response && setMessage('true')
      })
    } catch (err) {
      setMessage('incorrect credentials')
      return new Error('Something wrong')
    }
  }

  return (
    <Box sx={{ margin: 'auto', width: 400, padding: 10 }}>
      <form
        style={{ width: '400px' }}
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <label htmlFor="fname">First name:</label>
        <input
          onChange={(e) => {
            setMessage(null)
            setName(e.target.value)
          }}
          value={firstname}
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
          name="fname"
        />
        <label htmlFor="password">Password:</label>
        <input
          value={password}
          onChange={(e) => {
            setMessage(null)
            setPassword(e.target.value)
          }}
          style={{ width: '100%', padding: '10px' }}
          name="passowrd"
          type="password"
        />
        {message === 'true' ? (
          <Box className="success" mt="10px">
            Done!
          </Box>
        ) : (
          <Box className="errorMessage" mt="10px">
            {message}
          </Box>
        )}
        <Box mt="10px">
          <Button
            className="button"
            type="submit"
            disabled={message !== null || disabledButton}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default LoginForm
