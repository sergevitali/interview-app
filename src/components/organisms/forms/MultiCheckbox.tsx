import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel
} from '@mui/material'
import { useField } from 'formik'
import CheckboxField from './CheckboxField'

type MultiChecboxProps = {
  name: string
  label: string
  options: Array<{ label: string; value: string }>
}

const MultiChecbox: React.FC<MultiChecboxProps> = (props) => {
  const [field, meta] = useField(props)
  const { name, label, options } = props

  return (
    <FormControl
      required
      error={meta.touched && Boolean(meta.error)}
      component="fieldset"
      sx={{ marginLeft: '2px' }}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
        {options.map((opt, index) => (
          <CheckboxField
            key={index}
            name={name}
            label={opt.label}
            value={opt.value}
          />
        ))}
      </FormGroup>
      {meta.touched && Boolean(meta.error) && (
        <FormHelperText error>{meta.error}</FormHelperText>
      )}
    </FormControl>
  )
}

export default MultiChecbox
