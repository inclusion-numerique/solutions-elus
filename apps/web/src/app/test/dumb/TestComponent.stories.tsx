import React from 'react'

import { userEvent, within, waitFor } from '@storybook/testing-library'
import { jest, expect } from '@storybook/jest'
import { Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { ObjectFormData } from '@sde/web/pages/api/test/type'
import TestComponent from './TestComponent'

export default {
  title: 'TestComponent',
  component: TestComponent,
} as Meta<typeof TestComponent>

const Template: (args: {
  onSubmit: (data: ObjectFormData) => void | Promise<void>
}) => JSX.Element = (args: {
  onSubmit: (data: ObjectFormData) => void | Promise<void>
}) => {
  const form = useForm<ObjectFormData>({
    defaultValues: {
      name: 'John Doe',
    },
  })

  return <TestComponent form={form} onSubmit={(e) => onSubmit(e)} />
}

const onSubmit = jest.fn()

export const FilledForm = Template.bind({
  onSubmit,
})

FilledForm.play = async ({ canvasElement }) => {
  onSubmit.mockClear()

  const canvas = within(canvasElement)

  await expect(canvas.getByLabelText('Name')).toBeInTheDocument()
  await expect(canvas.getByLabelText('Name')).toHaveValue('John Doe')

  await userEvent.clear(canvas.getByLabelText('Name'))
  await userEvent.type(canvas.getByLabelText('Name'), 'My name is Slim')

  await userEvent.click(canvas.getByRole('button'))

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledTimes(2)
    //expect(onSubmit).toBeCalledWith({ name: 'My name is Slim' })
  })
}
