import { useEffect, useState } from 'react'

export type FormInputValues = {
  name: string
  email: string
  errorMessage: string
}

type FormComponentProps = {
  handleSubmit: (formValues: FormInputValues) => void
  errorMessage: string
}

const FormComponent: React.FunctionComponent<FormComponentProps> = ({
  handleSubmit,
  errorMessage
}) => {
  const [formValues, setFormValues] = useState<FormInputValues>({
    name: '',
    email: '',
    errorMessage
  })

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      errorMessage
    }))
  }, [errorMessage])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(formValues)
      }}
    >
      <div>
        <label htmlFor="fname">First Name</label>
        <input
          name="fname"
          type="text"
          onChange={(event) => {
            setFormValues((prev) => ({
              ...prev,
              name: event.target.value,
              errorMessage: ''
            }))
          }}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          onChange={(event) => {
            setFormValues((prev) => ({
              ...prev,
              email: event.target.value,
              errorMessage: ''
            }))
          }}
        />
      </div>
      <div
        style={
          formValues.errorMessage.length > 0
            ? { display: 'block', color: 'red' }
            : { display: 'none' }
        }
      >
        {formValues.errorMessage}
      </div>
      <button
        type="submit"
        disabled={formValues.email.length < 8 || formValues.name.length < 5}
      >
        Submit
      </button>
    </form>
  )
}

export default FormComponent
