import Styles from './App.module.scss'
import Button from '@mui/material/Button'
import { ComponentWithClass } from './components/componentWithClass/index'
import FormComponent, { FormInputValues } from './components/FormComponent'
import { useState } from 'react'
import { CounterWithReducer } from './components/counterWithReducer/index'

const fakePostApiCall = async (values: FormInputValues) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.name === 'serap' && values.email === 'serap@email.com') {
        resolve(true)
      } else {
        reject(new Error('Wrong'))
      }
    }, 2000)
  })
}

const componentWithClassData = {
  name: 'Name of my list',
  description: 'My list is here:'
}
function App() {
  const [toggleCounterWithReducer, setToggleCounterWithReducer] =
    useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const submit = async (values: FormInputValues) => {
    setErrorMessage('')
    try {
      const response = await fakePostApiCall(values)
      response && setLoggedIn(true)
    } catch (err) {
      setErrorMessage('Credentials Wrong!')
      return new Error('Error')
    }
  }

  return (
    <div className={Styles.App}>
      <h1>This is an app</h1>
      <Button
        variant="contained"
        className={Styles.button}
        onClick={() => setToggleCounterWithReducer(!toggleCounterWithReducer)}
      >
        Toggle Counter with reducer
      </Button>
      {!toggleCounterWithReducer ? (
        <div>
          <ComponentWithClass {...componentWithClassData} />
          {!loggedIn ? (
            <FormComponent
              errorMessage={errorMessage}
              handleSubmit={(values: FormInputValues) => submit(values)}
            />
          ) : (
            <div>You are logged in!</div>
          )}
        </div>
      ) : (
        <CounterWithReducer name="Counter With Reducer" />
      )}
    </div>
  )
}

export default App
