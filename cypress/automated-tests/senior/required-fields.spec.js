import { getRandomApplicantAge } from '../../common/birthdate-constants';

const faker = require('faker');

const applicantBirthdate = getRandomApplicantAge().applicantBirthdate65to90;
const applicantFirstName = faker.name.firstName();
const applicantLastName = faker.name.lastName();
const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;
const applicantCity = faker.address.city();
const applicantZipCode = '99999';

describe('senior required fields', () => {
  it("loads the form", function() {
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
  });

  it("does not fill in the application type and sees an error", function() {
    cy
      .get('#form-section-1 > .form-section-buttons > .form-submit-button')
      .click()

    cy.get('.required-text').should('be.visible');
  });

  it("does not fill in the date of birth and sees an error", function() {
    cy
      .get('[data-field-code="ApplicantStatus"]')
      .contains('Apply for a Senior CharlieCard')
      .click();
    cy
      .get('#form-section-1 > .form-section-buttons > .form-section-next')
      .click();
    cy
      .get('#form-section-2 > .form-section-buttons > .form-section-next')
      .click();


    cy.get('#element12').type(applicantFirstName).blur();
    cy.get('#element13').type(applicantLastName).blur();

    cy
      .get('#form-section-3 > .form-section-buttons > .form-submit-button')
      .click();
    
    cy.get('.required-text').should('be.visible');
  });

  it("does not fill out the first name and sees an error", function() {
    cy.get('#element10').type(applicantBirthdate).blur();
    cy.get('#element12').clear().blur();

    cy
      .get('#form-section-3 > .form-section-buttons > .form-submit-button')
      .click();
    
    cy.get('.required-text').should('be.visible');
  });

  it("does not fill out the last name and sees an error", function() {
    cy.get('#element12').type(applicantFirstName).blur();
    cy.get('#element13').clear().blur();

    cy
      .get('#form-section-3 > .form-section-buttons > .form-submit-button')
      .click();
    
    cy.get('.required-text').should('be.visible');
  });

  it("does not upload a photo ID and sees an error", function() {
    cy.get('#element13').type(applicantLastName).blur();
    cy
      .get('#form-section-3 > .form-section-buttons > .form-section-next')
      .click();
    cy
      .get('#form-section-4 > .form-section-buttons > .form-section-next')
      .click();

    cy
      .get('#form-section-5 > .form-section-buttons > .form-submit-button')
      .click();

    cy.get('.required-text').should('be.visible');
  });

  it("does not upload a headshot and sees an error", function() {
    cy
      .get('#element36')
      .attachFile('youth-pass-test-image.png');
    cy.get('.k-text-success').should('exist');
    cy
      .get('#form-section-5 > .form-section-buttons > .form-section-next')
      .click();

    cy
      .get('#form-section-6 > .form-section-buttons > .form-submit-button')
      .click();

    cy.get('.required-text').should('be.visible');
  });

  it("does not answer the delivery preference question and sees an error", function() {
    cy
      .get('#element39')
      .attachFile('youth-pass-test-image.png');
    cy.get('.k-text-success').should('exist');
    cy
      .get('#form-section-6 > .form-section-buttons > .form-section-next')
      .click();

    cy.get('#element22').type(applicantStreetAddress).blur();
    cy.get('#element24').type(applicantCity).blur();
    cy.get('#element26').type(applicantZipCode).blur();

    cy
      .get('#form-section-7 > .form-section-buttons > .form-submit-button')
      .click();

    cy.get('.required-text').should('be.visible');
  });

  it("sees an error if any required address fields are missing", function() {
    cy
      .get('[data-field-code="CardDeliveryPreference"]')
      .contains('Mail to my address')
      .click();
    cy
      .get('[data-field-code="MailingAddressSameAsHome"]')
      .contains('Yes')
      .click();
    cy.get('#element22').clear().blur();

    cy
      .get('#form-section-7 > .form-section-buttons > .form-submit-button')
      .click();
    cy.get('.required-text').should('be.visible');

    cy.get('#element22').type(applicantStreetAddress).blur();
    cy.get('#element24').clear().blur();

    cy
      .get('#form-section-7 > .form-section-buttons > .form-submit-button')
      .click();
    cy.get('.required-text').should('be.visible');

    cy.get('#element24').type(applicantCity).blur();
    cy.get('#element26').clear().blur();

    cy
      .get('#form-section-7 > .form-section-buttons > .form-submit-button')
      .click();
    cy.get('.required-text').should('be.visible');

    cy.get('#element26').type(applicantZipCode).blur();
    cy
      .get('[data-field-code="MailingAddressSameAsHome"]')
      .contains('No')
      .click();

    cy.get('#element31').type(applicantCity).blur();
    cy.get('#element33').type(applicantZipCode).blur();

    cy
      .get('#form-section-7 > .form-section-buttons > .form-submit-button')
      .click();
    cy.get('.required-text').should('be.visible');

    cy.get('#element29').type(applicantStreetAddress).blur()
    cy.get('#element31').clear().blur();

    cy
      .get('#form-section-7 > .form-section-buttons > .form-submit-button')
      .click();
    cy.get('.required-text').should('be.visible');

    cy.get('#element31').type(applicantCity).blur();
    cy.get('#element33').clear().blur();

    cy
      .get('#form-section-7 > .form-section-buttons > .form-submit-button')
      .click();
    cy.get('.required-text').should('be.visible');
  });

  it("does not agree to the rules and sees an error", function() {
    cy.get('#element33').type(applicantZipCode).blur();
    cy
      .get('#form-section-7 > .form-section-buttons > .form-section-next')
      .click();
    cy
      .get('#form-section-8 > .form-section-buttons > .form-section-next')
      .click();

    cy
      .get('#form-section-9 > .form-section-buttons > .form-submit-button')
      .click();
    cy.get('.required-text').should('be.visible');
  });
});
