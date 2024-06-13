import * as Yup from 'yup';

const formSchema = Yup.object({
  name: Yup.string()
    .required('Employee name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot be more than 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  age: Yup.number()
    .required('Age is required')
    .min(18, 'Minimum age is 18')
    .max(65, 'Maximum age is 65'),
  Job_profile: Yup.string()
    .required('Job profile is required')
    .min(2, 'Job profile must be at least 2 characters')
    .max(100, 'Job profile cannot be more than 100 characters'),
  Total_experience: Yup.string()
    .required('Experience is required')
});

export default formSchema;
