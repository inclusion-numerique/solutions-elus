import { useForm } from 'react-hook-form'
import { InputFormField } from '@sde/web/form/InputFormField'

export const TestForm = () => {
  const form = useForm({
    defaultValues: {
      name: 'John Doe',
    },
  })

  const onSubmit = () => {
    console.log('submit')
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <InputFormField control={form.control} path="name" label="Name" />
      <button type="submit">Submit</button>
    </form>
  )
}
