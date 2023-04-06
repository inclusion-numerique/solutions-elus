import React from 'react'

import { userEvent, within, waitFor } from '@storybook/testing-library'
import { jest, expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { ObjectFormData } from '@sde/web/pages/api/test/type'
import { Mock } from 'jest-mock'
import TestComponent, { TestComponentProps } from './TestComponent'
import '@testing-library/jest-dom/extend-expect'

const meta: Meta<typeof TestComponent> = {
  title: 'TestComponent',
  component: TestComponent,
}

export default meta

type Story = StoryObj<typeof TestComponent>

const Template: (args: {
  onSubmit: TestComponentProps['onSubmit']
}) => JSX.Element = (args: { onSubmit: TestComponentProps['onSubmit'] }) => {
  const form = useForm<ObjectFormData>({
    defaultValues: {
      name: 'John Doe',
    },
  })

  return <TestComponent form={form} onSubmit={(e) => onSubmit(e)} />
}

const onSubmit = jest.fn() as Mock<TestComponentProps['onSubmit']>

export const FilledForm: Story = {
  render: () => <Template onSubmit={onSubmit} />,
  play: async ({ canvasElement }) => {
    onSubmit.mockClear()

    const canvas = within(canvasElement)

    await expect(canvas.getByLabelText('Name')).toBeInTheDocument()
    await expect(canvas.getByLabelText('Name')).toHaveValue('John Doe')

    await userEvent.clear(canvas.getByLabelText('Name'))
    await userEvent.type(canvas.getByLabelText('Name'), 'My name is Slim')

    await userEvent.click(canvas.getByRole('button'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toBeCalledWith({ name: 'My name is Slim' })
    })
  },
}
