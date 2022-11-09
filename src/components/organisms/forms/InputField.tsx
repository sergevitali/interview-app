import { TextField } from '@mui/material'
import { useField } from 'formik'

type InputFieldProps = {
  name: string
  label: string
  type?: 'text' | 'number' | 'textarea'
  fullWidth?: boolean
}
const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, meta] = useField(props)
  const { name, type } = props

  return (
    <TextField
      size="small"
      fullWidth
      id={name}
      value={field.value}
      type={type ? type : 'text'}
      multiline={type === 'textarea'}
      minRows={4}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      {...props}
    />
  )
}

export default InputField
