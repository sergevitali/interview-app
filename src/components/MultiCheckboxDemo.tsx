import { FormControl, FormGroup, FormLabel } from '@mui/material'
import { useField } from 'formik'
import CheckboxFieldDemo from './CheckboxFieldDemo'

type MultiChecboxDemoProps = {
  name: string
  label: string
  options: Array<{ label: string; value: string }>
}

const MultiChecboxDemo: React.FC<MultiChecboxDemoProps> = (props) => {
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
          <CheckboxFieldDemo
            key={index}
            name={name}
            label={opt.label}
            value={opt.value}
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}

export default MultiChecboxDemo
