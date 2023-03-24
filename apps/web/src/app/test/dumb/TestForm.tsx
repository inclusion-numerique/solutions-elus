import { useForm } from 'react-hook-form'
import { ObjectFormData } from '@sde/web/pages/api/test/type'
import TestComponent from './TestComponent'

export const TestForm = () => {
  const form = useForm<ObjectFormData>({
    defaultValues: {
      name: 'John Doe',
    },
  })

  const onSubmit = () => {
    console.log('submit')
  }

  return <TestComponent control={form.control} onSubmit={onSubmit} />
}
