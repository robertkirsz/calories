/// <reference types="cypress" />

context('e2e test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Day can be added', function () {
    cy.get('[data-testid="add-new-day-button"]')
      .should('be.visible')
      .and('have.text', 'New day')
  })
})
