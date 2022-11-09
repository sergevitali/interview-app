import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { Form, Formik, FormikProps } from 'formik'
import CheckboxFieldDemo from './CheckboxFieldDemo'
import { InvestmentDetails } from './InvestmentDetails.types'
import MultiChecboxDemo from './MultiCheckboxDemo'
import SelectFieldDemo from './SelectFieldDemo'
import TextFieldDemo from './TextFieldDemo'

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
          onSubmit={(values, actions) => {
            console.log({ values, actions })
          }}
        >
          {({
            values,
            handleChange,
            touched,
            errors
          }: FormikProps<InvestmentDetails>) => (
            <Form>
              <Box mb={3}>
                <TextFieldDemo name="fullName" label="Full Name" fullWidth />
              </Box>
              <Box mb={2}>
                <TextFieldDemo
                  name="initialInvestment"
                  label="Initial Investment"
                  type="number"
                  fullWidth
                />
              </Box>
              <Box mb={1}>
                <MultiChecboxDemo
                  name="investmentRisk"
                  label="Investment Risk"
                  options={[
                    { label: 'Low', value: 'low' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' }
                  ]}
                />
              </Box>
              <Box mb={3}>
                <TextFieldDemo
                  name="commentAboutInvestmentRisk"
                  label="Comment About Investment Risk"
                  type="textarea"
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <SelectFieldDemo
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
                <CheckboxFieldDemo
                  name="acceptedTermsAndConditions"
                  label="Accepted Terms And Conditions"
                />
              </Box>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>

              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}

export default FormDemo
