import { getRandomApplicantAge } from '../../common/birthdate-constants';

const faker = require('faker');
const applicantZipCode = '99999';

describe('senior successful new submission - with an email address', () => {
  it("loads the senior form", function() {
    const seniorUrl = Cypress.env('senior_url');
    cy.visit(seniorUrl);
  });

  it('completes the language selection', () => {
    cy
      .get('[data-field-code="LanguageSelection"]')
      .contains('English')
      .click();
    cy
      .get('#form-section-0 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("selects apply for a new card", function() {
    cy
      .get('[data-field-code="ApplicantStatus"]')
      .contains('Apply for a Senior CharlieCard')
      .click();
    cy
      .get('#form-section-1 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("clicks through instructions", function() {
    cy
      .get('#form-section-2 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("enters personal information", function() {
    const applicantBirthdate = getRandomApplicantAge().applicantBirthdate65to90;
    const applicantFirstName = faker.name.firstName();
    const applicantLastName = faker.name.lastName();

    cy.get('#element10').type(applicantBirthdate).blur();
    cy.get('#element12').type(applicantFirstName).blur();
    cy.get('#element13').type(applicantLastName).blur();
    cy
      .get('#form-section-3 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("enters an email address and phone number for contact info", function() {
    const applicantPhoneNumber = faker.phone.phoneNumberFormat();
    const applicantEmailAddress = `Automation_Testing_${faker.datatype.number()}@example.com`;

    cy.get('#element15').type(applicantPhoneNumber).blur();
    cy.get('#element16').type(applicantEmailAddress).blur();
    cy
      .get('#form-section-4 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("uploads a photo ID", function() {
    cy
      .get('#element36')
      .attachFile('youth-pass-test-image.png');
    cy.get('.k-text-success').should('exist');
    cy
      .get('#form-section-5 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("uploads a headshot", function() {
    cy
      .get('#element39')
      .attachFile('youth-pass-test-image.png');
    cy.get('.k-text-success').should('exist');
    cy
      .get('#form-section-6 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("enters a home address", function() {
    const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;
    const applicantCity = faker.address.city();

    cy
      .get('[data-field-code="CardDeliveryPreference"]')
      .contains('Mail to my address')
      .click();
    cy.get('#element22').type(applicantStreetAddress).blur();
    cy.get('#element24').type(applicantCity).blur();
    cy.get('#element26').type(applicantZipCode).blur();
    cy
      .get('[data-field-code="MailingAddressSameAsHome"]')
      .contains('Yes')
      .click();
    cy
      .get('#form-section-7 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("skips the demographic section and agrees to the rules", function() {
    cy
      .get('#form-section-8 > .form-section-buttons > .form-section-next')
      .click();
    cy
      .get('[data-field-code="RulesAndConditionsCheckbox"]')
      .contains('I agree')
      .click();
    cy
      .get('#form-section-9 > .form-section-buttons > .form-submit-button')
      .click();

    cy
      .get('#thank-you-text', { timeout: 15000 })
      .should('contain', 'Application Submitted');
  });
});

describe('senior successful renewal submission - without an email address', () => {
  it("loads the senior form", function() {
    const seniorUrl = Cypress.env('senior_url');
    cy.visit(seniorUrl);
  });

  it('completes the language selection', () => {
    cy
      .get('[data-field-code="LanguageSelection"]')
      .contains('English')
      .click();
    cy
      .get('#form-section-0 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("selects renew my card", function() {
    cy
      .get('[data-field-code="ApplicantStatus"]')
      .contains('Renew')
      .click();
    cy
      .get('#form-section-1 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("enters personal information", function() {
    const applicantBirthdate = getRandomApplicantAge().applicantBirthdate65to90;
    const applicantFirstName = faker.name.firstName();
    const applicantLastName = faker.name.lastName();

    cy.get('#element10').type(applicantBirthdate).blur();
    cy.get('#element12').type(applicantFirstName).blur();
    cy.get('#element13').type(applicantLastName).blur();
    cy
      .get('#form-section-3 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("does not enter an email address or phone number for contact info", function() {
    cy
      .get('#form-section-4 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("skips uploading a headshot", function() {
    cy
      .get('#form-section-6 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("enters a home address", function() {
    const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;
    const applicantCity = faker.address.city();

    cy
      .get('[data-field-code="CardDeliveryPreference"]')
      .contains('Mail to my address')
      .click();
    cy.get('#element22').type(applicantStreetAddress).blur();
    cy.get('#element24').type(applicantCity).blur();
    cy.get('#element26').type(applicantZipCode).blur();
    cy
      .get('[data-field-code="MailingAddressSameAsHome"]')
      .contains('Yes')
      .click();
    cy
      .get('#form-section-7 > .form-section-buttons > .form-section-next')
      .click();
  });

  it("skips the demographic section and agrees to the rules", function() {
    cy
      .get('#form-section-8 > .form-section-buttons > .form-section-next')
      .click();
    cy
      .get('[data-field-code="RulesAndConditionsCheckbox"]')
      .contains('I agree')
      .click();
    cy
      .get('#form-section-9 > .form-section-buttons > .form-submit-button')
      .click();

    cy
      .get('#thank-you-text', { timeout: 15000 })
      .should('contain', 'Application Submitted');
  });
});
