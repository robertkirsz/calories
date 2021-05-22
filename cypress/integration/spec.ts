/// <reference types="cypress" />

import dayjs from 'dayjs'

context('e2e test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Day and activities can be added and deleted', () => {
    // There should be no days visible on the page at first
    cy.get('[data-testid="Day"]').should('not.exist')

    // Button for adding a new day should be visible
    cy.get('[data-testid="add-new-day-button"]').should('be.visible').and('have.text', 'New day')

    // ADDING STUFF

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
    cy.get('[data-testid="Day"] [data-testid="Day total kcal consumed"]').should(
      'have.text',
      '0 kcal'
    )

    // Should have no activities
    cy.get('[data-testid="Day"] [data-testid="Activity"]').should('not.exist')

    // There should be a button for adding activities
    cy.get('[data-testid="Day"] [data-testid="AddActivityModal button"]')
      .should('be.visible')
      .and('have.text', '+')

    // ACTIVITY #1

    // Clicking it should show a modal for adding activities
    cy.get('[data-testid="Day"] [data-testid="AddActivityModal button"]').click()

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
    cy.get('[data-testid="Activity name"]').should('be.visible').and('have.text', 'Pizza')
    cy.get('[data-testid="Activity calories"]').should('be.visible').and('have.text', '200 kcal')
    cy.get('[data-testid="Activity details"]')
      .should('be.visible')
      .and('have.text', '(100 g x 200 kcal/100g)')

    // Total calories consumed should now be 200 kcal
    cy.get('[data-testid="Day"] [data-testid="Day total kcal consumed"]').should(
      'have.text',
      '200 kcal'
    )

    // ACTIVITY #2

    cy.get('[data-testid="Day"] [data-testid="AddActivityModal button"]').click()
    cy.get('[data-testid="ActivityForm onlyKcal radio"]').click()
    cy.get('[data-testid="ActivityForm consumedKcal input"]').type('150')
    cy.get('[data-testid="ActivityForm"]').submit()

    // We now should have two activities visible
    cy.get('[data-testid="Activity"]').should('have.length', 2)

    // Total calories consumed should now be 350 kcal
    cy.get('[data-testid="Day"] [data-testid="Day total kcal consumed"]').should(
      'have.text',
      '350 kcal'
    )

    // EDITING STUFF

    // Edit values of the first activity
    cy.get('[data-testid="ActivityMenu button"]').first().click()
    cy.get('input[name="name"]').clear().type('Hamburger')
    cy.get('input[name="consumedGrams"]').clear().type('50')
    cy.get('input[name="kcalPer100g"]').clear().type('150')
    cy.get('[data-testid="ActivityForm"]').submit()

    // Activity should be updated
    cy.get('[data-testid="Activity name"]').first().should('have.text', 'Hamburger')
    cy.get('[data-testid="Activity calories"]').first().should('have.text', '75 kcal')
    cy.get('[data-testid="Activity details"]').first().should('have.text', '(50 g x 150 kcal/100g)')

    // Total calories consumed should be reduced to 275
    cy.get('[data-testid="Day"] [data-testid="Day total kcal consumed"]').should(
      'have.text',
      '225 kcal'
    )

    // DailyCaloricProgress
    cy.get('[data-testid="DailyCaloricProgress"]').should('not.exist')

    cy.get('[data-testid="Settings"]').should('not.exist')
    cy.get('[data-testid="SettingsModal button"]').click()
    cy.get('[data-testid="Settings"]').should('be.visible')
    cy.get('[data-testid="Settings dailyCaloricTarget input"]').clear().type('2000')
    cy.get('[data-testid="SettingsModal close button"]').click()
    cy.get('[data-testid="Settings"]').should('not.exist')

    cy.get('[data-testid="DailyCaloricProgress"]')
      .should('be.visible')
      .and('have.attr', 'style', 'width: 11%; background-color: lime;')

    // DELETING STUFF

    // The first activity should disappear when clicking it's delete button
    cy.get('[data-testid="ActivityMenu button"]').first().click()
    cy.get('[data-testid="ActivityMenu delete button"]').click()
    cy.get('[data-testid="ConfirmationModal yes button"]').click()

    // We now should have only one activity visible
    cy.get('[data-testid="Activity"]').should('have.length', 1)

    // Total calories consumed should be reduced to 150
    cy.get('[data-testid="Day"] [data-testid="Day total kcal consumed"]').should(
      'have.text',
      '150 kcal'
    )

    // Day should disappear when clicking it's delete button
    cy.get('[data-testid="Day menu modal"]').should('not.exist')
    cy.get('[data-testid="Day MenuButton"]').click()
    cy.get('[data-testid="Day menu modal"]').should('be.visible')
    cy.get('[data-testid="Day delete button"]').click()
    cy.get('[data-testid="ConfirmationModal"]').should('be.visible')
    cy.get('[data-testid="ConfirmationModal yes button"]').click()
    cy.get('[data-testid="Day menu modal"]').should('not.exist')
    cy.get('[data-testid="Day"]').should('not.exist')

    // The "add day" button should no longer be disabled
    cy.get('[data-testid="add-new-day-button"]').should('not.be.disabled')
  })
})

context('Day', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="Load mock data button"]').click()
  })

  it('Can be merged', () => {
    cy.get('[data-testid="Day"]:nth-child(2) [data-testid="Activity"]').should('have.length', 3)
    cy.get('[data-testid="Day"]:nth-child(2) [data-testid="Day total kcal consumed"]').should(
      'have.text',
      '649 kcal'
    )
    cy.get('[data-testid="Day"]:nth-child(2) [data-testid="Day MenuButton"]').click()
    cy.get('[data-testid="Day merge button"]').click()
    cy.get('[data-testid="Day"]:nth-child(2) [data-testid="Activity"]').should('not.exist')
    cy.get('[data-testid="Day"]:nth-child(2) [data-testid="Day total kcal consumed"]').should(
      'have.text',
      '649 kcal'
    )
  })
})

context('Activity', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="Load mock data button"]').click()
  })

  it('Can be copied to a new day', () => {
    cy.get('[data-testid="Day"]').should('have.length', 3)
    cy.get('[data-testid="Activity"]').should('have.length', 5)

    cy.get('[data-testid="Day"]:first-child [data-testid="Activity"]')
      .should('have.length', 1)
      .find('[data-testid="ActivityMenu button"]')
      .click()

    cy.get('input[name="name"]').clear().type('Copied Ramen')

    cy.get('[data-testid="ActivityMenu copy button"]').click()

    cy.get('[data-testid="Day"]').should('have.length', 4)
    cy.get('[data-testid="Activity"]').should('have.length', 6)

    cy.get('[data-testid="Day"]:first-child [data-testid="Activity"]').should('have.length', 1)
    cy.get('[data-testid="Day"]:first-child [data-testid="Activity"] [data-testid="Activity name"]')
      .first()
      .should('have.text', 'Copied Ramen')
  })

  it('Can be copied to an existing day', () => {
    cy.get('[data-testid="Day"]').should('have.length', 3)
    cy.get('[data-testid="Activity"]').should('have.length', 5)
    cy.get('[data-testid="add-new-day-button"]').click()

    cy.get(
      '[data-testid="Day"]:nth-child(2) [data-testid="Activity"] [data-testid="ActivityMenu button"]'
    ).click()

    cy.get('[data-testid="ActivityMenu copy button"]').click()

    cy.get('[data-testid="Day"]').should('have.length', 4)
    cy.get('[data-testid="Activity"]').should('have.length', 6)

    cy.get('[data-testid="Day"]:first-child [data-testid="Activity"]').should('have.length', 1)
    cy.get('[data-testid="Day"]:first-child [data-testid="Activity"] [data-testid="Activity name"]')
      .first()
      .should('have.text', 'Ramen')
  })
})
