describe("TAP", () => {
  it("is now on MyCharlie", () => {
    const youthPassUrl = Cypress.env("tap_url");

    cy.visit(youthPassUrl);

    cy.title().should("eq", "MyCharlie CTA");
    cy.contains("h1", "Apply for TAP on MyCharlie").should(
      "exist",
    );
    cy.contains(
      "p",
      "We've moved applications for the TAP program to the MyCharlie platform.",
    ).should("exist");
    cy.contains("Apply for TAP")
      .should("exist")
      .should(
        "have.prop",
        "href",
        "https://www.mycharlie.mbta.com/reduced/disability",
      );
    cy.get(".form-submit-button").should("be.hidden");
  });
});
