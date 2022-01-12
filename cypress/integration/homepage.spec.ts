export {} // silence the --isolated-modules warning

describe("Homepage", () => {
  it("works", () => {
    cy.visit("/")
    cy.contains("Welcome to Next.js!")
  })
})
