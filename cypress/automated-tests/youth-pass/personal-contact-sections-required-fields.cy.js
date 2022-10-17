import { faker } from '@faker-js/faker';
import { getRandomApplicantAge } from '../../common/birthdate-constants';
import { ifProgramYearFieldExists } from '../../common/if-program-year-field-exists';

describe('Youth Pass Personal and Contact Info Section Required Fields', () => {
    
    it('proceeds through an application', () => {
        const applicantZipCode = '02114';
        const youthPassUrl = Cypress.env('youth_pass_url');
        const applicantBirthdate = getRandomApplicantAge().applicantBirthdate18to25;
        
        cy.visit(youthPassUrl);
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(applicantZipCode).blur();
        cy.get('#element15').type(applicantBirthdate).blur();
        cy.get('#form-section-2 > .form-section-buttons > .form-section-next').click();
        
        cy.get('#element164_Yes').click().blur();
        cy.get('#form-section-4 > .form-section-buttons > .form-section-next').click();
    });
    
    it('does not fill any personal info fields and sees required field errors', () => {              
        cy.get('#form-section-5 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_116').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
        cy.get('#form-element-wrapper_11').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
        cy.get('#form-element-wrapper_13').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
    });
    
    it('only fills application options radio and sees required field errors', () => {              
        cy.get('#element116_Apply').click().blur();
        cy.get('#form-section-5 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_116').within(() => {
            cy.get('div.required-text').should('not.be.visible');
        });
        cy.get('#form-element-wrapper_11').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
        cy.get('#form-element-wrapper_13').within(() => {
            cy.get('div.required-text').should('be.visible');
        });          
    });
    
    it('does not fill last name and sees required field errors', () => {              
        const applicantFirstName = faker.name.firstName();
        ifProgramYearFieldExists(() => {
            cy.get('#form-element-wrapper_260').within(() => {
                cy.get('div.required-text').should('be.visible');
            });
            cy.get('#element260_Current').click().blur();
            cy.get('#form-element-wrapper_260').within(() => {
                cy.get('div.required-text').should('not.be.visible');
            });
        });
        cy.get('#element11').type(applicantFirstName).blur();
        cy.get('#form-section-5 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_11').within(() => {
            cy.get('div.required-text').should('not.be.visible');
        });
        cy.get('#form-element-wrapper_13').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
    });   
        
    it('fills all personal info fields and sees no required field errors', () => {                    
        const applicantLastName = faker.name.lastName();

        cy.get('#element13').type(applicantLastName).blur();
        cy.get('div.required-text').should('not.be.visible');
        cy.get('#form-section-5 > .form-section-buttons > .form-section-next').click();
    });
    
    it('does not fill any contact info fields and sees required field errors', () => {              
        cy.get('#form-section-6 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_17').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
        cy.get('#form-element-wrapper_18').within(() => {
            cy.get('div.required-text').should('be.visible');
        });
    });
    
    it('only fills phone number and sees required field errors', () => {              
        const applicantPhoneNumber = faker.phone.phoneNumberFormat();

        cy.get('#element17').type(applicantPhoneNumber).blur();
        cy.get('#form-section-6 > .form-section-buttons > .form-submit-button').click();
        cy.get('#form-element-wrapper_17').within(() => {
            cy.get('div.required-text').should('not.be.visible');
        });
        cy.get('#form-element-wrapper_18').within(() => {
            cy.get('div.required-text').should('be.visible');
        });          
    });
    
        
    it('fills all contact info fields and sees no required field errors', () => {                    
        const applicantEmailAddress = `Automation_Testing_${faker.datatype.number()}@example.com`;
        
        cy.get('#element18').type(applicantEmailAddress).blur();
        cy.get('div.required-text').should('not.be.visible');
    });
});
