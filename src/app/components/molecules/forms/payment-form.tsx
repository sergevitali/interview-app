import { Typography, Grid } from '@mui/material'

interface IPaymentFormProps {}

const PaymentForm: React.FC<IPaymentFormProps> = () => {
  return (
    <>
      <Typography>Payment Form</Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </>
  )
}

export default PaymentForm
