import { getRandomApplicantAge } from '../../common/birthdate-constants';

import { faker } from '@faker-js/faker';

const applicantBirthdate = getRandomApplicantAge().applicantBirthdate65to90;
const applicantFirstName = faker.name.firstName();
const applicantLastName = faker.name.lastName();
const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;
const applicantCity = faker.address.city();
const applicantZipCode = '99999';

describe('TAP required fields', () => {
  it("loads the form", function() {
    // Load the form
    const tapUrl = Cypress.env('tap_url');
    cy.visit(tapUrl);
  });

  it("tries to submit without filling out anything", function() {
    cy.get('.form-submit-button').click();
  });

  it("sees a required error for application type", function() {
    cy
      .get('#form-element-wrapper_10 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });

  it("sees a required error for disability documentation type", function() {
    cy
      .get('#form-element-wrapper_163 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });

  it("sees a required error for date of birth", function() {
    cy
      .get('#form-element-wrapper_13 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });


  it("sees a required error for first name", function() {
    cy
      .get('#form-element-wrapper_15 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });


  it("sees a required error for last name", function() {
    cy
      .get('#form-element-wrapper_16 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });

  it("sees a required error for photo ID", function() {
    cy
      .get('#form-element-wrapper_25 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });

  it("sees a required error for headshot", function() {
    cy
      .get('#form-element-wrapper_30 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });

  it("sees a required error for delivery preference", function() {
    cy
      .get('#form-element-wrapper_39 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });

  it("sees a required error for rules", function() {
    cy
      .get('#form-element-wrapper_61 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });

  it("sees a required error for release authorization", function() {
    cy
      .get('#form-element-wrapper_185 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });

  it("selects 'Mail to my address' for delivery preference and tries to submit", function() {
    cy
      .get('[data-field-code="CardDeliveryPreference"]')
      .contains('Mail to my address')
      .click();

    cy.get('.form-submit-button').click();
  });

  it("sees a required error for street address", function() {
    cy
      .get('#form-element-wrapper_44 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });

  it("sees a required error for city", function() {
    cy
      .get('#form-element-wrapper_46 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });
  
  it("sees a required error for zip code", function() {
    cy
      .get('#form-element-wrapper_48 > :nth-child(1) > [rcd=""] > .required-text')
      .should('be.visible');
  });

  it("fills in all required fields", function() {
    cy
      .get('[data-field-code="ApplicantStatus"]')
      .contains('Apply for a new Transportation Access Pass (TAP) CharlieCard')
      .click();
    cy
      .get('[data-field-code="DisabilityDocumentationType"]')
      .contains('Upload proof of disability')
      .click();
    cy.get('#element13').type(applicantBirthdate).blur();
    cy.get('#element15').type(applicantFirstName).blur();
    cy.get('#element16').type(applicantLastName).blur();
    cy
      .get('#element25')
      .attachFile('youth-pass-test-image.png');
    cy.get('#form-element-wrapper_25 > :nth-child(1) > [rcd=""] > .newFileUploadArea > .k-widget > .k-upload-files > .k-file > .k-file-name-size-wrapper > .k-file-validation-message').should('exist');
    cy
      .get('#element30')
      .attachFile('youth-pass-test-image.png');
    cy.get('#form-element-wrapper_30 > :nth-child(1) > [rcd=""] > .newFileUploadArea > .k-widget > .k-upload-files > .k-file > .k-file-name-size-wrapper > .k-file-validation-message').should('exist');
    cy
      .get('[data-field-code="DisabilityDocumentationUpload"]')
      .contains('Disability placard from the Registry of Motor Vehicles (RMV)')
      .click();
    cy
      .get('#element175')
      .attachFile('youth-pass-test-image.png');
    cy
      .get('#form-element-wrapper_175 > :nth-child(1) > [rcd=""] > .newFileUploadArea > .k-widget > .k-upload-files > .k-file > .k-file-name-size-wrapper > .k-file-validation-message')
      .should('exist');
    cy.get('#element44').type(applicantStreetAddress).blur();
    cy.get('#element46').type(applicantCity).blur();
    cy.get('#element48').type(applicantZipCode).blur();
    cy
      .get('[data-field-code="RulesAndConditionsCheckbox"]')
      .contains('I agree')
      .click();
    cy
      .get('[data-field-code="DisabilityReleaseCheckbox"]')
      .contains('I authorize')
      .click();
  });

  it("does not see any required field errors", function() {
    cy.get('.required-text').should('not.be.visible');
  });
});
