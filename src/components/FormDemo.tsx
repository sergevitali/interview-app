import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import { validation } from './FormDemoValidation'
import { InvestmentDetails } from './InvestmentDetails.types'
import {
  CheckboxField,
  InputField,
  SelectField,
  MultiCheckbox
} from './organisms/forms'

const initialValues: InvestmentDetails = {
  fullName: '',
  initialInvestment: 0,
  investmentRisk: [],
  commentAboutInvestmentRisk: '',
  dependents: 0,
  acceptedTermsAndConditions: false
}

const FormDemo: React.FC<{}> = () => {
  return (
    <Card sx={{ maxWidth: '500px', margin: '16px auto' }}>
      <CardContent>
        <Typography variant="h4" mb={2}>
          New Account
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values, actions) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(true)
              }, 5000)
            }).then(() => console.log(values))
          }}
        >
          {({
            values,
            errors,
            isSubmitting,
            isValidating
          }: FormikProps<InvestmentDetails>) => (
            <Form>
              <Box mb={3}>
                <InputField name="fullName" label="Full Name" fullWidth />
              </Box>
              <Box mb={2}>
                <InputField
                  name="initialInvestment"
                  label="Initial Investment"
                  type="number"
                  fullWidth
                />
              </Box>
              <Box mb={1}>
                <MultiCheckbox
                  name="investmentRisk"
                  label="Investment Risk"
                  options={[
                    { label: 'Low - Safe', value: 'low' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High - Super Risky', value: 'high' }
                  ]}
                />
              </Box>
              <Box mb={3}>
                <InputField
                  name="commentAboutInvestmentRisk"
                  label="Comment About Investment Risk"
                  type="textarea"
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <SelectField
                  name="dependents"
                  label="Dependents"
                  options={[
                    { name: 'none', value: 0 },
                    { name: '1', value: 1 },
                    { name: '2', value: 2 },
                    { name: '3', value: 3 }
                  ]}
                  fullWidth
                />
              </Box>
              <Box mb={1}>
                <CheckboxField
                  name="acceptedTermsAndConditions"
                  label="Accepted Terms And Conditions"
                />
              </Box>
              <Button
                disabled={isSubmitting || isValidating}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>

              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}

export default FormDemo
