import React from 'react'

import { userEvent, within } from '@storybook/testing-library'
import { expect, jest } from '@storybook/jest'
import '@testing-library/jest-dom/extend-expect'
import { Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { ObjectFormData } from '@sde/web/pages/api/test/type'
import { Simulate } from 'react-dom/test-utils'
import TestComponent from './TestComponent'
import submit = Simulate.submit

export default {
  title: 'TestComponent',
  component: TestComponent,
} as Meta<typeof TestComponent>

const Template: (args: {
  onSubmit: (data: ObjectFormData) => void | Promise<void>
}) => JSX.Element = (args: {
  onSubmit: (data: ObjectFormData) => void | Promise<void>
}) => {
  const form = useForm<ObjectFormData>()

  const onSubmit = form.handleSubmit(args.onSubmit)

  return <TestComponent form={form} onSubmit={onSubmit} />
}

const onSubmit = jest.fn()

export const FilledForm = Template.bind({
  onSubmit: onSubmit,
})

FilledForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await expect(canvas.getByLabelText('Name')).toBeInDocument()

  await expect(canvas.getByLabelText('Name')).toBeInDocument('John Doe')

  // 👇 Simulate interactions with the component
  await userEvent.type(canvas.getByLabelText('Name'), 'My name is Slim')

  await userEvent.click(canvas.getByRole('button'))

  expect(submit).toHaveBeenCalledTimes(1)
}
