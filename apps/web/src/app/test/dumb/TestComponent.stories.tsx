import React from 'react'

import { within, userEvent } from '@storybook/testing-library'
import { expect, jest } from '@storybook/jest'

import TestComponent, { TestComponentProps } from './TestComponent'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'TestComponent',
  component: TestComponent,
} as Meta<typeof TestComponent>

const Template: StoryFn<typeof TestComponent> = (args: TestComponentProps) => (
  <TestComponent {...args} />
)

export const FilledForm = Template.bind({
  onSubmit: () => {
    console.log('Bonjour')
  },
})

FilledForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await expect(canvas.getByTestId('name-input')).toHaveText('John Doe')
  //
  // // 👇 Simulate interactions with the component
  // await userEvent.type(canvas.getByTestId('name-input'), 'My name is Slim')
  //
  // await userEvent.click(canvas.getByTestId('submit-button'))
  //
  // expect(submit).toHaveBeenCalledTimes(1)
}
