import { faker } from '@faker-js/faker';
import { getRandomApplicantAge } from '../../common/birthdate-constants';

describe('TAP parental consent flow', () => {
  it('proceeds through an application', () => {
    const tapUrl = Cypress.env('tap_url');    
    cy.visit(tapUrl);
    cy
      .get('[data-field-code="LanguageSelection"]')
      .contains('English')
      .click();
    cy
      .get('[data-field-code="ApplicantStatus"]')
      .contains('Apply for a new Transportation Access Pass (TAP) CharlieCard')
      .click();
    cy
      .get('[data-field-code="DisabilityDocumentationType"]')
      .contains('Upload proof of disability')
      .click();
  });

  it("shows the parental consent fields only when under 13", function() {
    const applicantBirthdate13 = getRandomApplicantAge().applicantBirthday13;
    const applicantBirthdate12 = getRandomApplicantAge().applicantBirthday12;
    
    cy.get('#element13').type(applicantBirthdate13).blur();
    cy.get('#form-element-wrapper_234 > .form-static-html > h2').should('not.be.visible');

    cy.get('#element13').clear().type(applicantBirthdate12).blur();
    cy.get('#form-element-wrapper_234 > .form-static-html > h2').should('be.visible');
  });

  it("enters parental data and submits", function() {
    const parentFirstName = faker.name.firstName();
    const parentLastName = faker.name.lastName();
    const parentPhoneNumber = faker.phone.phoneNumberFormat();
    const parentEmailAddress = `Automation_Testing_${faker.datatype.number()}@example.com`;

    cy.get('#element233').click()
    cy.get('#element235').type(parentFirstName).blur();
    cy.get('#element236').type(parentLastName).blur();
    cy.get('#element237').type(parentPhoneNumber).blur();
    cy.get('#element238').type(parentEmailAddress).blur();
    cy.get('.form-submit-button').click();
    
    cy.get('#thank-you-text > h1', { timeout: 15000 }).should('contain', 'Parent or Legal Guardian Information Submitted')
  });
});
