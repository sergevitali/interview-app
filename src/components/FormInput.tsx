import React, { useEffect, useRef, useState } from 'react'
import Styles from './Form.module.scss'

type FormInputProps = {
  name: string
  placeholder: string
  label: string
  type: string
  value: string
  errorMessage: string
  required: boolean
  pattern?: string
  updateValues: (e: any) => void
}
const FormInput: React.FC<FormInputProps> = ({
  name,
  placeholder,
  label,
  type,
  value,
  errorMessage,
  required,
  pattern,
  updateValues
}) => {
  const [focused, setFocused] = useState(false)

  return (
    <div className={Styles.FormInputContainer}>
      <label className={Styles.Label}>{label}</label>
      <input
        className={Styles.FormInput}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={updateValues}
        required={required}
        pattern={pattern}
        autoComplete="new-password"
        onBlur={(e) => setFocused(true)}
      />
      {focused && <span className={Styles.Error}>{errorMessage}</span>}
    </div>
  )
}

export default FormInput
