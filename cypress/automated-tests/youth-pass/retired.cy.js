describe("Youth Pass", () => {
  it("is retired", () => {
    const youthPassUrl = Cypress.env("youth_pass_url");

    cy.visit(youthPassUrl);

    cy.title().should("eq", "Youth Pass Retirement");
    cy.contains("h1", "The Youth Pass Program has been retired").should(
      "exist",
    );
    cy.contains(
      "p",
      "The Youth Pass program was retired and replaced by the new income-eligible reduced fares program on October 31, 2024.",
    ).should("exist");
    cy.contains("Learn more about income-eligible reduced fares")
      .should("exist")
      .should(
        "have.prop",
        "href",
        "https://www.mbta.com/fares/reduced/income-eligible",
      );
    cy.get(".form-submit-button").should("be.hidden");
  });
});
