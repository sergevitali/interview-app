import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { useField } from 'formik'

type CheckboxFieldDemoProps = {
  name: string
  label: string
  value?: string
}
const CheckboxFieldDemo: React.FC<CheckboxFieldDemoProps> = (props) => {
  const [field, meta] = useField(props)
  const { label, value } = props

  return (
    <FormControl required error={meta.touched && Boolean(meta.error)}>
      <FormControlLabel
        control={
          <Checkbox
            value={value}
            name={field.name}
            checked={field.checked}
            onChange={field.onChange}
          />
        }
        label={label}
      />
    </FormControl>
  )
}

export default CheckboxFieldDemo
