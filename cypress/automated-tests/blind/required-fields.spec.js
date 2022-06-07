import { getRandomApplicantAge } from '../../common/birthdate-constants';

const faker = require('faker');

const applicantBirthdate = getRandomApplicantAge().applicantBirthdate65to90;
const applicantFirstName = faker.name.firstName();
const applicantLastName = faker.name.lastName();
const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;
const applicantCity = faker.address.city();
const applicantZipCode = '99999';

describe('blind required fields', () => {
  it("loads the form", function() {
    // Load the form
    const blindUrl = Cypress.env('blind_url');
    cy.visit(blindUrl);

    // Language selection
    // cy
    //   .get('[data-field-code="LanguageSelection"]')
    //   .contains('English')
    //   .click();
    // cy
    //   .get('#form-section-0 > .form-section-buttons > .form-section-next')
    //   .click();
    
    // Instructions
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
      .contains('Apply for a new Blind Access CharlieCard')
      .click();
    cy
      .get('#form-section-1 > .form-section-buttons > .form-section-next')
      .click();

    cy.get('#element15').type(applicantFirstName).blur();
    cy.get('#element16').type(applicantLastName).blur();

    cy
      .get('#form-section-2 > .form-section-buttons > .form-submit-button')
      .click();
    
    cy.get('.required-text').should('be.visible');
  });

  it("does not fill out the first name and sees an error", function() {
    cy.get('#element13').type(applicantBirthdate).blur();
    cy.get('#element15').clear().blur();

    cy
      .get('#form-section-2 > .form-section-buttons > .form-submit-button')
      .click();
    
    cy.get('.required-text').should('be.visible');
  });

  it("does not fill out the last name and sees an error", function() {
    cy.get('#element15').type(applicantFirstName).blur();
    cy.get('#element16').clear().blur();

    cy
      .get('#form-section-2 > .form-section-buttons > .form-submit-button')
      .click();
    
    cy.get('.required-text').should('be.visible');
  });

  it("does not answer the MCB ID question and sees an error", function() {
    cy.get('#element16').type(applicantLastName).blur();
    cy
      .get('#form-section-2 > .form-section-buttons > .form-section-next')
      .click();
    // Skip contact info
    cy
      .get('#form-section-3 > .form-section-buttons > .form-section-next')
      .click();

    cy
      .get('#form-section-4 > .form-section-buttons > .form-submit-button')
      .click();

    cy.get('.required-text').should('be.visible');
  });

  it("does not upload an MCB ID and sees an error", function() {
    cy
      .get('[data-field-code="MCBIDCardYesNo"]')
      .contains('Yes')
      .click();

    cy
      .get('#form-section-4 > .form-section-buttons > .form-submit-button')
      .click();

    cy.get('.required-text').should('be.visible');
  });
    
  it("does not upload a headshot and sees an error", function() {
    cy
      .get('#element148')
      .attachFile('youth-pass-test-image.png');
    cy.get('.k-text-success').should('exist');
    cy
      .get('#form-section-4 > .form-section-buttons > .form-section-next')
      .click();

    cy
      .get('#form-section-7 > .form-section-buttons > .form-submit-button')
      .click();

    cy.get('.required-text').should('be.visible');
  });

  it("does not answer the delivery preference question and sees an error", function() {
    cy
      .get('#element30')
      .attachFile('youth-pass-test-image.png');
    cy.get('.k-text-success').should('exist');
    cy
      .get('#form-section-7 > .form-section-buttons > .form-section-next')
      .click();

    cy
      .get('#form-section-8 > .form-section-buttons > .form-submit-button')
      .click()

      cy.get('.required-text').should('be.visible');
  });

  it("sees an error if any required address fields are missing", function() {
    cy
      .get('[data-field-code="CardDeliveryPreference"]')
      .contains('Mail to my address')
      .click();

    cy.get('#element46').type(applicantCity).blur();
    cy.get('#element48').type(applicantZipCode).blur();

    cy
      .get('#form-section-8 > .form-section-buttons > .form-submit-button')
      .click();
    cy.get('.required-text').should('be.visible');

    cy.get('#element44').type(applicantStreetAddress).blur();
    cy.get('#element46').clear().blur();

    cy
      .get('#form-section-8 > .form-section-buttons > .form-submit-button')
      .click();
    cy.get('.required-text').should('be.visible');

    cy.get('#element46').type(applicantCity).blur();
    cy.get('#element48').clear().blur();

    cy
      .get('#form-section-8 > .form-section-buttons > .form-submit-button')
      .click();
    cy.get('.required-text').should('be.visible');
  });

  it("does not agree to the rules and sees an error", function() {
    cy.get('#element48').type(applicantZipCode).blur();
    cy
      .get('#form-section-8 > .form-section-buttons > .form-section-next')
      .click();
    cy
      .get('#form-section-9 > .form-section-buttons > .form-section-next')
      .click();

    cy
      .get('#form-section-10 > .form-section-buttons > .form-submit-button')
      .click();

    cy.get('.required-text').should('be.visible');
  });
});
