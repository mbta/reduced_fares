import { faker } from '@faker-js/faker';
import { getRandomApplicantAge } from '../../common/birthdate-constants';

describe('youth pass parental consent flow', () => {
  it('proceeds through an application', () => {
    const youthPassUrl = Cypress.env('youth_pass_url');
    const applicantZipCode = '02114';
    
    cy.visit(youthPassUrl);
    cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
    cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
    cy.get('#element105').type(applicantZipCode).blur();
    
  });

  it("shows the parental consent fields only when under 13", function() {
    const applicantBirthdate13 = getRandomApplicantAge().        applicantBirthday13;
    const applicantBirthdate12 = getRandomApplicantAge().        applicantBirthday12;
    
    cy.get('#element15').type(applicantBirthdate13).blur();
    cy.get('#form-element-wrapper_321 > .form-static-html > h2').should('not.be.visible');

    cy.get('#element15').clear().type(applicantBirthdate12).blur();
    cy.get('#form-element-wrapper_321 > .form-static-html > h2').should('be.visible');
  });

  it("enters parental data and submits", function() {
    const parentFirstName = faker.name.firstName();
    const parentLastName = faker.name.lastName();
    const parentPhoneNumber = faker.phone.phoneNumberFormat();
    const parentEmailAddress = `Automation_Testing_${faker.datatype.number()}@example.com`;

    cy.get('#form-element-wrapper_315 > :nth-child(1) > [rcd=""] > fieldset > .radioButtonContainer').click()
    cy.get('#element316').type(parentFirstName).blur();
    cy.get('#element320').type(parentLastName).blur();
    cy.get('#element318').type(parentPhoneNumber).blur();
    cy.get('#element323').type(parentEmailAddress).blur();
    cy.get('#form-section-2 > .form-section-buttons > .form-submit-button').click();
    
    cy.get('#thank-you-text > h1', { timeout: 15000 }).should('contain', 'Parent or Legal Guardian Information Submitted')
  });
});
