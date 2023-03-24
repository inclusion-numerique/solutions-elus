import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { within, userEvent } from '@storybook/testing-library'

import { expect } from '@storybook/jest'

import TestComponent, { TestComponentProps } from './TestComponent'

export default {
  title: 'TestComponent',
  component: TestComponent,
} as ComponentMeta<typeof TestComponent>

const Template: ComponentStory<typeof TestComponent> = (
  args: TestComponentProps,
) => <TestComponent {...args} />

const submit = jest.fn()
export const FilledForm = Template.bind({
  onSubmit: submit,
})

FilledForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByTestId('name-input')).toHaveText('John Doe')

  // 👇 Simulate interactions with the component
  await userEvent.type(canvas.getByTestId('name-input'), 'My name is Slim')

  await userEvent.click(canvas.getByTestId('submit-button'))

  expect(submit).toHaveBeenCalledTimes(1)
}
