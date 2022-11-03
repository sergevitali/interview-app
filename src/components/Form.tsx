import React, { useState } from 'react'
import FormInput from './FormInput'
import Styles from './Form.module.scss'

type FormProps = {}

type FormValues = {
  username: string
  email: string
  password: string
  errorMessage: string
}

type FormInputElement = {
  id: number
  type: string
  name: string
  placeholder: string
  label: string
  errorMessage: string
  pattern?: string
  required: boolean
}

const Form: React.FC<FormProps> = () => {
  const [values, setValues] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
    errorMessage: ''
  })

  const inputs: FormInputElement[] = [
    {
      id: 1,
      type: 'text',
      name: 'username',
      placeholder: 'Username',
      errorMessage: '3-16 characters',
      label: 'Username',
      pattern: '^[a-zA-Z0-9]{3,16}$',
      required: true
    },
    {
      id: 2,
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      errorMessage: 'Valid email',
      label: 'Email',
      required: true
    },
    {
      id: 3,
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      errorMessage: 'Should include at least one number & 8-20 characters',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      label: 'Password',
      required: true
    }
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(values)
  }

  const updateValues = (e: any) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className={Styles.FormContainer}>
      <form className={Styles.Form} onSubmit={(e) => handleSubmit(e)}>
        <h2 className={Styles.Title}>Login</h2>
        {inputs.map((input, index) => (
          <FormInput
            key={index}
            {...input}
            value={values[input.name as keyof FormValues]}
            updateValues={updateValues}
          />
        ))}

        <button className={Styles.Button}>Submit</button>
      </form>
    </div>
  )
}

export default Form
