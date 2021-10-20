const faker = require('faker');

describe('Youth Pass Address Section Required Fields', () => {
    it('proceeds through an application', () => {
        const applicantZipCode = '02114';
        const youthPassUrl = Cypress.env('youth_pass_url');
        const randomBirthdate = faker.date.between('2003-11-02', '2009-11-01');
        const applicantBirthdate = `${randomBirthdate.getMonth() + 1}/${randomBirthdate.getDate()}/${randomBirthdate.getFullYear()}`;
        const applicantSchoolName = `Automation Testing ${faker.datatype.number()} School`;
        const applicantFirstName = faker.name.firstName();
        const applicantLastName = faker.name.lastName();
        const applicantPhoneNumber = faker.phone.phoneNumberFormat();
        const applicantEmailAddress = `Automation_Testing_${faker.datatype.number()}@example.com`;
        
        cy.visit(youthPassUrl);
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(applicantZipCode).blur();
        cy.get('#element15').type(applicantBirthdate).blur();
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element159_Option_1').click().blur();
        cy.get('#element160_Option_2').click().blur();
        cy.get('#element163').type(applicantSchoolName).blur();
        cy.get('#form-section-2 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element116_Option_1').click().blur();
        cy.get('#element11').type(applicantFirstName).blur();
        cy.get('#element13').type(applicantLastName).blur();
        cy.get('#form-section-4 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element17').type(applicantPhoneNumber).blur();
        cy.get('#element18').type(applicantEmailAddress).blur();
        cy.get('#form-section-5 > .form-section-buttons > .form-section-next').click();
    });
    
    it('does not fill any home address fields and sees required field errors', () => {              
        cy.get('#form-section-6 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_101').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
        cy.get('#form-element-wrapper_103').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
        cy.get('#form-element-wrapper_154').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
        cy.get('#form-element-wrapper_122').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
    });
    
    it('only fills home street address and sees required field errors', () => {              
        const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;

        cy.get('#element101').type(applicantStreetAddress).blur();
        cy.get('#form-section-6 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_101').within(() => {
            cy.get('div.required-text').should('not.be.visible');
        });
        cy.get('#form-element-wrapper_103').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
        cy.get('#form-element-wrapper_154').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
        cy.get('#form-element-wrapper_122').within(() => {
            cy.get('div.required-text').should('be.visible');
        });    
    });
    
    it('does not fill home zip or same address boolean and sees required field errors', () => {              
        const applicantCity = faker.address.city();

        cy.get('#element103').type(applicantCity).blur();
        cy.get('#form-section-6 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_103').within(() => {
            cy.get('div.required-text').should('not.be.visible');
        });
        cy.get('#form-element-wrapper_154').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
        cy.get('#form-element-wrapper_122').within(() => {
            cy.get('div.required-text').should('be.visible');
        });    
    });
    
    it('does not fill same address boolean and sees required field errors', () => {              
        const applicantZipCode = '02114';

        cy.get('#element154').type(applicantZipCode).blur();
        cy.get('#form-section-6 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_154').within(() => {
            cy.get('div.required-text').should('not.be.visible');
        });
        cy.get('#form-element-wrapper_122').within(() => {
            cy.get('div.required-text').should('be.visible');
        });    
    });
    
    it('does not fill any mailing address fields and sees required field errors', () => {              
        cy.get('#element122_Option_2').click().blur();
        cy.get('#form-section-6 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_117').within(() => {
            cy.get('div.required-text').should('be.visible');
        });  
        cy.get('#form-element-wrapper_119').within(() => {
            cy.get('div.required-text').should('be.visible');
        });  
        cy.get('#form-element-wrapper_121').within(() => {
            cy.get('div.required-text').should('be.visible');
        });  
    });
    
    it('only fills mailing street address and sees required field errors', () => {              
        const applicantMailingAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;

        cy.get('#element117').type(applicantMailingAddress).blur();
        cy.get('#form-section-6 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_117').within(() => {
            cy.get('div.required-text').should('not.be.visible');
        });  
        cy.get('#form-element-wrapper_119').within(() => {
            cy.get('div.required-text').should('be.visible');
        });  
        cy.get('#form-element-wrapper_121').within(() => {
            cy.get('div.required-text').should('be.visible');
        });  
    });
    
    it('does not fill mailing zip and sees required field errors', () => {              
        const applicantMailingCity = faker.address.city();

        cy.get('#element119').type(applicantMailingCity).blur();
        cy.get('#form-section-6 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_119').within(() => {
            cy.get('div.required-text').should('not.be.visible');
        });  
        cy.get('#form-element-wrapper_121').within(() => {
            cy.get('div.required-text').should('be.visible');
        });  
    });
    
    it('fills mailing zip and sees no required field errors', () => {              
        const applicantMailingZipCode = '02149';
        
        cy.get('#element121').type(applicantMailingZipCode).blur();
        cy.get('div.required-text').should('not.be.visible');
    });
});
