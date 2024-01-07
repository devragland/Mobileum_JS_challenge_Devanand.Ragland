import * as Yup from 'yup'

export const smartphoneSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  brand: Yup.string().required('Brand is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.string()
    .url('Must be a valid URL')
    .required('Image URL is required')
})
