import { getRandomApplicantAge } from '../../common/birthdate-constants';

describe('senior birth date validation', () => {
  it("loads the form and gets to the personal information section", function() {
    // Load the form
    const seniorUrl = Cypress.env('senior_url');
    cy.visit(seniorUrl);

    // Language Selection
    cy
      .get('[data-field-code="LanguageSelection"]')
      .contains('English')
      .click();
    cy
      .get('#form-section-0 > .form-section-buttons > .form-section-next')
      .click();

    // Application Type
    cy
      .get('[data-field-code="ApplicantStatus"]')
      .contains('Apply for a Senior CharlieCard')
      .click();
    cy
      .get('#form-section-1 > .form-section-buttons > .form-section-next')
      .click();
  
    // Instructions
    cy
      .get('#form-section-2 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("shows an error if the applicant is younger than 65", function() {
    const applicantBirthdate = getRandomApplicantAge().applicantBirthday64;

    cy.get('#element10').type(applicantBirthdate).blur();

    cy.get('.error-alert-item').should('be.visible');
    cy
      .get('#form-section-3 > .form-section-buttons > .form-section-next')
      .should('not.be.visible');
  });
});
