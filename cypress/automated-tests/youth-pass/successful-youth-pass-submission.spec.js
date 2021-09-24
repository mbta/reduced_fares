const faker = require('faker');

describe('Youth Pass Successful Submission', () => {
    it('Submits a Youth Pass Application', () => {
        const youthPassUrl = Cypress.env('youth_pass_url');
        const applicantFirstName = faker.name.firstName();
        const applicantLastName = faker.name.lastName();
        const applicantEmailAddress = `Automation_Testing_${faker.datatype.number()}@example.com`;
        const applicantPhoneNumber = faker.phone.phoneNumber();
        const randomBirthdate = faker.date.between('1996-11-01', '2004-10-31');
        const applicantBirthdate = `${randomBirthdate.getMonth() + 1}/${randomBirthdate.getDate()}/${randomBirthdate.getFullYear()}`;
        const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;
        const applicantCity = faker.address.city();
        const applicantZipCode = '02114';
        
        cy.visit(youthPassUrl);
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(applicantZipCode).blur();
        cy.get('#element15').type(applicantBirthdate).blur();
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element164_Option_1').click().blur();
        cy.get('#form-section-3 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element116_Option_1').click().blur();
        cy.get('#element11').type(applicantFirstName).blur();
        cy.get('#element13').type(applicantLastName).blur();
        cy.get('#form-section-4 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element17').type(applicantPhoneNumber).blur();
        cy.get('#element18').type(applicantEmailAddress).blur();
        cy.get('#form-section-5 > .form-section-buttons > .form-section-next').click();
                
        cy.get('#element101').type(applicantStreetAddress).blur();
        cy.get('#element103').type(applicantCity).blur();
        cy.get('#element154').type(applicantZipCode).blur();
        cy.get('#element122_Option_1').click().blur();
        cy.get('#form-section-6 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element114_Option_1').click().blur();
        cy.get('#element133').attachFile('youth-pass-test-image.png')
        cy.get('.k-file-validation-message').should('exist');
        cy.get('#form-section-7 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element135_Option_1').click().blur();
        cy.get('#element39').attachFile('youth-pass-test-image.png')
        cy.get('.k-file-validation-message').should('exist');
        cy.get('#form-section-8 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element41_Option_1').click().blur();
        cy.get('#element42').select('Child Care (DTA, EEC)', { force: true });
        cy.get('#element136').attachFile('youth-pass-test-image.png')
        cy.get('.k-file-validation-message').should('exist');
        cy.get('#form-section-9 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element52_Option_2').click().blur();
        cy.get('#form-section-10 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element50').click().blur();
        cy.get('#form-section-11 > .form-section-buttons > .form-submit-button').click();

        cy.get('#thank-you-text').should('contain', 'Application Submitted')
        cy.get('#thank-you-text').should('contain', 'mbtayouthpass@boston.gov')
    });
});

