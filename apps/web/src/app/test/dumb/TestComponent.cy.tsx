import React from 'react'
import { useForm } from 'react-hook-form'
import TestComponent from './TestComponent'

const Wrapper = (onSubmit: any) => {
  const form = useForm<{ name: string }>({
    defaultValues: {
      name: 'John Doe',
    },
  })

  return <TestComponent onSubmit={onSubmit} form={form} />
}

describe('<TestComponent />', () => {
  it('renders', () => {
    const onSubmit = cy.stub()

    cy.mount(<Wrapper onSubmit={onSubmit} />)

    cy.get('[data-testid=name-input]').should('have.value', 'John Doe')
    cy.get('[data-testid=name-input]').clear()
    cy.get('[data-testid=name-input]').type('My name is Slim')
    cy.get('[data-testid=submit-button]').click()
  })
})
