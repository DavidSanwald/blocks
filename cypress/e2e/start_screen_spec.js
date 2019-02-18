describe('start screen', () => {
  it('Visits the first page', () => {
    cy.visit('/')
    cy.get('[data-testid=start-stop-button]')
      .click()
      .cy.get('[data-testid=start-stop-button]')
    cy.get('[data-testid=start-stop-button]').click()
  })
})
