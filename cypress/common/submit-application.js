import { getRandomApplicantAge } from './birthdate-constants';

/**
 * Return a completed Youth Pass application
 * @param {string} zipCode zip code that the application will submit to
 * @param {string} [firstName=faker.name.firstName()] applicant first name, defaults to faker name if not passed
 * @param {string} [lastName=faker.name.lastName()] applicant last name, defaults to faker name if not passed
*/
export function submitApplication(zipCode, firstName, lastName) {
    import { faker } from '@faker-js/faker';
    const youthPassUrl = Cypress.env('youth_pass_url');
    const applicantZipCode = zipCode;
    const applicantBirthdate = getRandomApplicantAge().applicantBirthdate18to25;
    const applicantFirstName = firstName || faker.name.firstName();
    const applicantLastName = lastName || faker.name.lastName();
    const applicantPhoneNumber = faker.phone.phoneNumberFormat();
    const applicantEmailAddress = `Automation_Testing_${faker.datatype.number()}@example.com`;
    const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;
    const applicantCity = faker.address.city();

    cy.visit(youthPassUrl);
    cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
    cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
    cy.get('#element105').type(applicantZipCode).blur();
    cy.get('#element15').type(applicantBirthdate).blur();
    cy.get('#form-section-2 > .form-section-buttons > .form-section-next').click();
    
    cy.get('#element164_Yes').click().blur();
    cy.get('#form-section-4 > .form-section-buttons > .form-section-next').click();

    cy.get('#element116_Apply').click().blur();
    cy.get('#element11').type(applicantFirstName).blur();
    cy.get('#element13').type(applicantLastName).blur();
    cy.get('#form-section-5 > .form-section-buttons > .form-section-next').click();
    
    cy.get('#element17').type(applicantPhoneNumber).blur();
    cy.get('#element18').type(applicantEmailAddress).blur();
    cy.get('#form-section-6 > .form-section-buttons > .form-section-next').click();

    cy.get('#element242_Person').click().blur();
    cy.get('#element101').type(applicantStreetAddress).blur();
    cy.get('#element103').type(applicantCity).blur();
    cy.get('#element154').type(applicantZipCode).blur();
    cy.get('#form-section-7 > .form-section-buttons > .form-section-next').click();

    cy.get('#element114_Option_1').click().blur();
    cy.get('#element133').attachFile('youth-pass-test-image.png')
    cy.get('.k-text-success').should('exist');
    cy.get('#form-section-8 > .form-section-buttons > .form-section-next').click();

    cy.get('#element135_Option_1').click().blur();
    cy.get('#element39').attachFile('youth-pass-test-image.png')
    cy.get('.k-text-success').should('exist');
    cy.get('#form-section-9 > .form-section-buttons > .form-section-next').click();

    cy.get('#element42').select('Child Care (DTA, EEC)', { force: true });
    cy.get('#element136').attachFile('youth-pass-test-image.png')
    cy.get('.k-text-success').should('exist');
    cy.get('#form-section-10 > .form-section-buttons > .form-section-next').click();
    
    cy.get('#element52_Option_2').click().blur();
    cy.get('#form-section-11 > .form-section-buttons > .form-section-next').click();

    cy.get('#element50').click().blur();
    cy.get('#form-section-12 > .form-section-buttons > .form-submit-button').click();

    cy.get('#thank-you-text', { timeout: 15000 }).should('contain', 'Application Submitted')
};
