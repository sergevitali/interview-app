import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { useFormStyles } from './FormikForm.styles'
import { Formik, Form, FormikValues, FormikHelpers } from 'formik'
import { InitialValues } from '../../utils/initial-values'
import { AddressForm, PaymentForm } from '../molecules/forms'
import { FormModal } from '../../utils/form-model'
import { Button, CircularProgress } from '@mui/material'
import { useState } from 'react'

const steps = ['Shipping address', 'Payment details', 'Review your order']

const renderStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <AddressForm formField={FormModal.formField} />
    case 1:
      return <PaymentForm />
    case 2:
      return <>Step 3</>
  }
}

const HorizontalStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const styles = useFormStyles()

  const isLast = activeStep === steps.length - 1

  const submitForm = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    alert(JSON.stringify(values, null, 2))
    actions.setSubmitting(false)
    setActiveStep((prev) => prev + 1)
  }

  const handleSubmit = (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    if (isLast) {
      submitForm(values, actions)
    } else {
      setActiveStep((prev) => prev + 1)
      actions.setTouched({})
      actions.setSubmitting(false)
    }
  }

  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Formik
        initialValues={InitialValues}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
        }}
      >
        {(formikProps) => (
          <Form>
            {renderStepContent(activeStep)}
            <div className={styles.classes.buttons}>
              {activeStep !== 0 && (
                <Button
                  onClick={() => {
                    setActiveStep((prev) => prev - 1)
                  }}
                  className={styles.classes.button}
                >
                  Back
                </Button>
              )}

              <div className={styles.classes.wrapper}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={styles.classes.button}
                  disabled={formikProps.isSubmitting}
                >
                  {isLast ? 'Place your order' : 'Next'}
                </Button>
                {formikProps.isSubmitting && <CircularProgress />}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default HorizontalStepper
