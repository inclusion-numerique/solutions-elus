import { expect } from '@storybook/jest'
import { waitFor, within } from '@storybook/testing-library'

export const withinDSFR = async (canvasElement: HTMLElement) => {
  const html = document.getElementsByTagName('html')[0]

  await waitFor(() => {
    expect(html).toHaveAttribute('data-fr-js', 'true')
  })
  return within(canvasElement)
}
