// Schema/index.js
import * as Yup from 'yup';

const addressSchema = Yup.object().shape({
  address1: Yup.string().required('Address1 is required'),
  // address2: Yup.string(),
  city: Yup.string().required('City is required'),
  province: Yup.string().required('Province is required'),
  country: Yup.string().required('Country is required'),
  zip: Yup.string().required('Zip is required'),
  // phone: Yup.string().required('Phone is required'),
  // name: Yup.string().required('Name is required'),
});

const amountSpentSchema = Yup.object().shape({
  amount: Yup.string().required('Amount is required'),
  currencyCode: Yup.string().required('Currency Code is required'),
});

const formSchema = Yup.object().shape({
  store_domain: Yup.string().required('Store Domain is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
 phone: Yup.string()
    .required('Phone is required')
    .matches(/^[0-9]{10,14}$/, 'Phone number must be 10 digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(14, 'Phone number must be at most 14 digits'),
  addresses: Yup.array().of(addressSchema).required('At least one address is required'),
  amountSpent: Yup.array().of(amountSpentSchema).required('At least one amount is required'),
  verifiedEmail: Yup.boolean().required('Verified Email is required'),
});

export default formSchema;
