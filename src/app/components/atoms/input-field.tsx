import { useField } from 'formik'
import { TextField, TextFieldProps } from '@mui/material'

interface IInputFieldProps {
  errorText?: string
  defaultProps: TextFieldProps
}

const InputField: React.FC<IInputFieldProps> = ({
  errorText,
  defaultProps
}) => {
  const [field, meta] = useField(defaultProps.name as string)

  const renderHelperText = () => {
    if (!!meta.error && meta.touched) return meta.error
  }

  return (
    <TextField
      type="text"
      error={meta.touched && !!meta.error}
      helperText={renderHelperText()}
      {...field}
      {...defaultProps}
    />
  )
}

export default InputField
