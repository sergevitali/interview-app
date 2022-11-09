import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@mui/material'
import { useField } from 'formik'

type CheckboxFieldProps = {
  name: string
  label: string
  value?: string
}
const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const [field, meta] = useField(props)
  const { label, value } = props
  const isError = Boolean(meta.error) && meta.touched && !value

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            value={value}
            name={field.name}
            checked={field.checked}
            onChange={field.onChange}
          />
        }
        label={label}
      />
      {isError && <FormHelperText error>{meta.error}</FormHelperText>}
    </FormControl>
  )
}

export default CheckboxField
