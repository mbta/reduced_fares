const faker = require('faker');

describe('Youth Pass Successful Submission', () => {
    const applicantZipCode = '99999';

    it('completes the eligibility checker', () => {
        const youthPassUrl = Cypress.env('youth_pass_url');
        const todaysDate = new Date();
        const eighteenYearsAgo = todaysDate.getFullYear() - 18; 
        const twentySixYearsAgo = todaysDate.getFullYear() - 26; 
        const randomBirthdate = faker.date.between(`${twentySixYearsAgo}-11-02`, `${eighteenYearsAgo}-11-01`);
        const applicantBirthdate = `${randomBirthdate.getMonth() + 1}/${randomBirthdate.getDate()}/${randomBirthdate.getFullYear()}`;

        cy.visit(youthPassUrl);
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(applicantZipCode).blur();
        cy.get('#element15').type(applicantBirthdate).blur();
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element164_Option_1').click().blur();
        cy.get('#form-section-3 > .form-section-buttons > .form-section-next').click();
    });

    it('completes the personal information section', () => {
        const applicantFirstName = faker.name.firstName();
        const applicantLastName = faker.name.lastName();

        cy.get('#element116_Option_1').click().blur();
        cy.get('#element11').type(applicantFirstName).blur();
        cy.get('#element13').type(applicantLastName).blur();
        cy.get('#form-section-4 > .form-section-buttons > .form-section-next').click();
    });

    it('completes the contact information section', () => {
        const applicantPhoneNumber = faker.phone.phoneNumberFormat();
        const applicantEmailAddress = `Automation_Testing_${faker.datatype.number()}@example.com`;
        
        cy.get('#element17').type(applicantPhoneNumber).blur();
        cy.get('#element18').type(applicantEmailAddress).blur();
        cy.get('#form-section-5 > .form-section-buttons > .form-section-next').click();
    });

    it('completes the address section', () => {
        const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;
        const applicantCity = faker.address.city();

        cy.get('#element101').type(applicantStreetAddress).blur();
        cy.get('#element103').type(applicantCity).blur();
        cy.get('#element154').type(applicantZipCode).blur();
        cy.get('#element122_Option_1').click().blur();
        cy.get('#form-section-6 > .form-section-buttons > .form-section-next').click();
    });

    it('completes the proof of age section', () => {
        cy.get('#element114_Option_1').click().blur();
        cy.get('#element133').attachFile('youth-pass-test-image.png')
        cy.get('.k-text-success').should('exist');
        cy.get('#form-section-7 > .form-section-buttons > .form-section-next').click();
    });

    it('completes the proof of address section', () => {
        cy.get('#element135_Option_1').click().blur();
        cy.get('#element39').attachFile('youth-pass-test-image.png')
        cy.get('.k-text-success').should('exist');
        cy.get('#form-section-8 > .form-section-buttons > .form-section-next').click();
    });

    it('completes the proof of program eligiblity section', () => {
        cy.get('#element41_Option_1').click().blur();
        cy.get('#element42').select('Child Care (DTA, EEC)', { force: true });
        cy.get('#element136').attachFile('youth-pass-test-image.png')
        cy.get('.k-text-success').should('exist');
        cy.get('#form-section-9 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element52_Option_2').click().blur();
        cy.get('#form-section-10 > .form-section-buttons > .form-section-next').click();
    });

    it('agrees to terms and conditions and submits application', () => {
        cy.get('#element50').click().blur();
        cy.get('#form-section-11 > .form-section-buttons > .form-submit-button').click();

        cy.get('#thank-you-text', { timeout: 15000 }).should('contain', 'Application Submitted')
        cy.get('#thank-you-text', { timeout: 15000 }).should('contain', 'ebalkam@mbta.com')
    });
});
