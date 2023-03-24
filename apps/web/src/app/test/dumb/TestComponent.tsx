import React, { FormEventHandler } from 'react'
import { Control } from 'react-hook-form'
import { InputFormField } from '@sde/web/form/InputFormField'
import { ObjectFormData } from '@sde/web/pages/api/test/type'

export type TestComponentProps = {
  control: Control<ObjectFormData>
  onSubmit: FormEventHandler<HTMLFormElement>
}

const TestComponent = ({ control, onSubmit }: TestComponentProps) => (
  <form onSubmit={onSubmit}>
    <InputFormField
      data-testid="name-input"
      control={control}
      path="name"
      label="Name"
    />
    <button data-testid="submit-button" type="submit">
      Submit
    </button>
  </form>
)

export default TestComponent
