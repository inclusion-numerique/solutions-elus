import React from 'react'
import { useForm } from 'react-hook-form'
import { SinonStub } from 'cypress/types/sinon'
import TestComponent, { TestComponentProps } from './TestComponent'

const Wrapper = ({
  onSubmit,
}: {
  onSubmit: TestComponentProps['onSubmit']
}) => {
  const form = useForm<{ name: string }>({
    defaultValues: {
      name: 'John Doe',
    },
  })

  return <TestComponent onSubmit={onSubmit} form={form} />
}

describe('<TestComponent />', () => {
  it('renders', () => {
    const onSubmit = cy
      .stub()
      .as('onSubmit') as TestComponentProps['onSubmit'] & SinonStub

    cy.mount(<Wrapper onSubmit={onSubmit} />)

    cy.get('[data-testid=name-input]').should('have.value', 'John Doe')
    cy.get('[data-testid=name-input]').clear()
    cy.get('[data-testid=name-input]').type('My name is Slim')
    cy.get('[data-testid=submit-button]').click()
    cy.get('@onSubmit').should('have.been.calledOnceWith', {
      name: 'My name is Slim',
    })
  })
})
