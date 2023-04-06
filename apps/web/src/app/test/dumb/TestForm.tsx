'use client'

import { useForm } from 'react-hook-form'
import { ObjectFormData } from '@sde/web/pages/api/test/type'
import TestComponent from './TestComponent'

const onSubmit = () => {
  console.log('submit')
}

export const TestForm = () => {
  const form = useForm<ObjectFormData>({
    defaultValues: {
      name: 'John Doe',
    },
  })

  return <TestComponent form={form} onSubmit={onSubmit} />
}
