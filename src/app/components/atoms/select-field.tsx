// PLUGINS IMPORTS //
import { Select, InputLabel, MenuItem, FormHelperText } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useField } from 'formik'

interface ISelectFieldProps {
  data: Array<{ label: string; value: string }>
  label: string
  name: string
  fullWidth?: boolean
}

const SelectField: React.FC<ISelectFieldProps> = (props) => {
  const { label, data, fullWidth } = props
  const [field, meta] = useField(props)
  const { value: selectedValue } = field
  const isError = meta.touched && !!meta.error

  function renderHelperText() {
    if (isError) {
      return <FormHelperText>{meta.error}</FormHelperText>
    }
  }

  return (
    <FormControl fullWidth={fullWidth} error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} value={selectedValue} label={label}>
        {data.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {renderHelperText()}
    </FormControl>
  )
}

export default SelectField
