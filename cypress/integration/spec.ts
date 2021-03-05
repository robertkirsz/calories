/// <reference types="cypress" />

import dayjs from 'dayjs'

context('e2e test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Day and activity can be added and deleted', () => {
    // There should be no days visible on the page at first
    cy.get('[data-testid="Day"]').should('not.exist')

    // Button for adding a new day should be visible
    cy.get('[data-testid="add-new-day-button"]')
      .should('be.visible')
      .and('have.text', 'New day')

    // When we click on it, an entry on the list of days should appear
    cy.get('[data-testid="add-new-day-button"]').click()
    cy.get('[data-testid="Day"]').should('be.visible')

    // The button should no longer be active
    cy.get('[data-testid="add-new-day-button"]').should('be.disabled')

    // Date should be today's
    cy.get('[data-testid="Day"] [data-testid="Day date"]')
      .should('be.visible')
      .and('have.text', dayjs().format('DD-MM-YYYY'))

    // Total calories consumed should be 0 kcal
    cy.get(
      '[data-testid="Day"] [data-testid="Day total kcal consumed"]'
    ).should('have.text', '0 kcal')

    // There should be a button for adding activities
    cy.get('[data-testid="Day"] [data-testid="AddActivityModal button"]')
      .should('be.visible')
      .and('have.text', '+')

    // Clicking it should show a modal for adding activities
    cy.get(
      '[data-testid="Day"] [data-testid="AddActivityModal button"]'
    ).click()

    cy.get('[data-testid="ActivityForm"]').should('be.visible')

    // Form for "gramsOfKcal" activity type (default one) can be filled in
    cy.get('[type="radio"][value="gramsOfKcal"]').should('be.checked')
    cy.get('input[name="consumedGrams"]').type('100')
    cy.get('input[name="kcalPer100g"]').type('200')
    cy.get('input[name="name"]')
      .should('have.attr', 'placeholder', 'Optional name of meal or activity')
      .type('Pizza')

    // After submitting the form modal should disappear
    cy.get('[data-testid="ActivityForm"]').submit()
    cy.get('[data-testid="ActivityForm"]').should('not.exist')

    // A new activity should appear
    cy.get('[data-testid="Activity"]').should('be.visible')
    cy.get('[data-testid="Activity name"]')
      .should('be.visible')
      .and('have.text', 'Pizza')
    cy.get('[data-testid="Activity calories"]')
      .should('be.visible')
      .and('have.text', '200 kcal')
    cy.get('[data-testid="Activity details"]')
      .should('be.visible')
      .and('have.text', '(100 g x 200 kcal/100g)')

    // Total calories consumed should now be 200 kcal
    cy.get(
      '[data-testid="Day"] [data-testid="Day total kcal consumed"]'
    ).should('have.text', '200 kcal')

    // The activity should disappear when clicking it's delete butto
    cy.get('[data-testid="Activity delete button"]').click()
    cy.get('[data-testid="Delete confirmation modal"]').should('be.visible')
    cy.get('[data-testid="Delete confirmation modal yes button"]').click()
    cy.get('[data-testid="Activity"]').should('not.exist')

    // Day should dissapear when clicking it's delete button
    cy.get('[data-testid="Day delete button"]').click()
    cy.get('[data-testid="Delete confirmation modal"]').should('be.visible')
    cy.get('[data-testid="Delete confirmation modal yes button"]').click()
    cy.get('[data-testid="Day"]').should('not.exist')

    // The "add day" button should no longer be disabled
    cy.get('[data-testid="add-new-day-button"]').should('not.be.disabled')
  })
})
