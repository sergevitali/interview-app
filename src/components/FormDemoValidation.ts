import * as Yup from 'yup'

export const validation = Yup.object({
  fullName: Yup.string()
    .required('Your name is mandatory!')
    .min(2, 'Your name must be at least 2 characters')
    .max(100),
  initialInvestment: Yup.number()
    .required('Initial investment is mandatory!')
    .min(100, 'Initial investment must be greater or equal to 100'),
  dependents: Yup.number().required().min(0).max(5),
  acceptedTermsAndConditions: Yup.boolean()
    .required('Required')
    .oneOf([true], 'You must accept the terms and conditions.'),
  investmentRisk: Yup.array(Yup.string().oneOf(['high', 'medium', 'low']))
    .min(1, 'You must select at least one risk type')
    .max(1, 'Investment Risk field must have less than or equal to 1 items'),
  commentAboutInvestmentRisk: Yup.mixed().when('investmentRisk', {
    is: (investmentRisk: string[]) =>
      investmentRisk.find((ir) => ir === 'high'),
    then: Yup.string()
      .required('Please comment about investment risk if you select high risk')
      .min(20)
      .max(100),
    otherwise: Yup.string().min(20).max(100)
  })
})
