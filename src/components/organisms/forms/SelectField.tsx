import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useField } from 'formik'

type SelectFieldProps = {
  name: string
  label: string
  options: { value: string | number; name: string }[]
  fullWidth?: boolean
}
const SelectField: React.FC<SelectFieldProps> = (props) => {
  const [field, meta] = useField(props)
  const { name, label, options } = props

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>

      <Select
        label={label}
        id={name}
        name={name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={meta.touched && Boolean(meta.error)}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectField
