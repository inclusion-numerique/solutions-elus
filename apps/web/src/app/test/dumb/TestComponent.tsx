import React, { FormEventHandler } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { InputFormField } from '@sde/web/form/InputFormField'
import { ObjectFormData } from '@sde/web/pages/api/test/type'

export type TestComponentProps = {
  form: UseFormReturn<ObjectFormData>
  onSubmit: (data: ObjectFormData) => void
}

const TestComponent = ({ form, onSubmit }: TestComponentProps) => (
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <InputFormField
      data-testid="name-input"
      control={form.control}
      path="name"
      label="Name"
    />
    <button className="fr-btn" data-testid="submit-button" type="submit">
      Submit
    </button>
  </form>
)

export default TestComponent
