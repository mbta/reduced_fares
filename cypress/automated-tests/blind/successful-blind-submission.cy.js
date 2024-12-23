import { getRandomApplicantAge } from '../../common/birthdate-constants';

import { faker } from '@faker-js/faker';
const applicantZipCode = '99999';

describe('blind successful new submission - with an email address', () => {
  it("loads the blind form", function() {
    const blindUrl = Cypress.env('blind_url');
    cy.visit(blindUrl);
  });

  it('completes the language selection', () => {
    cy
      .get('[data-field-code="LanguageSelection"]')
      .contains('English')
      .click();
  });

  it("selects apply for a new card", function() {
    cy
      .get('[data-field-code="ApplicantStatus"]')
      .contains('Apply for a new Blind Access CharlieCard')
      .click();
  });

  it("enters personal information", function() {
    const applicantBirthdate = getRandomApplicantAge().applicantBirthdate65to90;
    const applicantFirstName = faker.name.firstName();
    const applicantLastName = faker.name.lastName();

    cy.get('#element13').type(applicantBirthdate).blur();
    cy.get('#element15').type(applicantFirstName).blur();
    cy.get('#element16').type(applicantLastName).blur();
  });

  it("enters an email address and phone number for contact info", function() {
    const applicantPhoneNumber = faker.phone.phoneNumberFormat();
    const applicantEmailAddress = `Automation_Testing_${faker.datatype.number()}@example.com`;

    cy.get('#element19').type(applicantPhoneNumber).blur();
    cy.get('#element20').type(applicantEmailAddress).blur();
  });

  it("uploads an MCB ID", function() {
    cy
      .get('[data-field-code="MCBIDCardYesNo"]')
      .contains('Yes')
      .click();

    cy
      .get('#element148')
      .attachFile('youth-pass-test-image.png');
    cy.get('.k-text-success').should('exist');
  });

  it("uploads a headshot", function() {
    cy
      .get('#element30')
      .attachFile('youth-pass-test-image.png');
    cy.get('.k-text-success').should('exist');
  });

  it("enters a home address", function() {
    const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;
    const applicantCity = faker.address.city();

    cy
      .get('[data-field-code="CardDeliveryPreference"]')
      .contains('Mail to my address')
      .click();
    cy.get('#element44').type(applicantStreetAddress).blur();
    cy.get('#element46').type(applicantCity).blur();
    cy.get('#element48').type(applicantZipCode).blur();
  });

  it("skips the demographic section and agrees to the rules", function() {
    cy
      .get('[data-field-code="RulesAndConditionsCheckbox"]')
      .contains('I agree')
      .click();

    cy.get('.form-submit-button').click();

    cy
      .get('#thank-you-text', { timeout: 15000 })
      .should('contain', 'Application Submitted');
  });
});

describe('blind successful renewal submission - without an email address', () => {
  it("loads the blind form", function() {
    const blindUrl = Cypress.env('blind_url');
    cy.visit(blindUrl);
  });

  it('completes the language selection', () => {
    cy
      .get('[data-field-code="LanguageSelection"]')
      .contains('English')
      .click();
  });

  it("selects renew my card", function() {
    cy
      .get('[data-field-code="ApplicantStatus"]')
      .contains('Renew')
      .click();
  });

  it("enters personal information", function() {
    const applicantBirthdate = getRandomApplicantAge().applicantBirthdate65to90;
    const applicantFirstName = faker.name.firstName();
    const applicantLastName = faker.name.lastName();

    cy.get('#element13').type(applicantBirthdate).blur();
    cy.get('#element15').type(applicantFirstName).blur();
    cy.get('#element16').type(applicantLastName).blur();
  });

  it("does not enter an email address or phone number for contact info", function() {
    // Intentionally empty
  });

  it("uploads a photo ID", function() {
    cy
      .get('#element25')
      .attachFile('youth-pass-test-image.png');
    cy.get('.k-text-success').should('exist');
  });

  it("uploads a headshot", function() {
    cy
      .get('#element30')
      .attachFile('youth-pass-test-image.png');
    cy.get('.k-text-success').should('exist');
  });

  it("enters a home address", function() {
    const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;
    const applicantCity = faker.address.city();

    cy
      .get('[data-field-code="CardDeliveryPreference"]')
      .contains('Mail to my address')
      .click();
    cy.get('#element44').type(applicantStreetAddress).blur();
    cy.get('#element46').type(applicantCity).blur();
    cy.get('#element48').type(applicantZipCode).blur();
  });

  // Disable submission
  //it("skips the demographic section and agrees to the rules", function() {
  //  cy
  //    .get('[data-field-code="RulesAndConditionsCheckbox"]')
  //    .contains('I agree')
  //    .click();
  //
  //  cy.get('.form-submit-button').click();
  //
  //  cy
  //    .get('#thank-you-text', { timeout: 15000 })
  //    .should('contain', 'Application Submitted');
  //});
});
