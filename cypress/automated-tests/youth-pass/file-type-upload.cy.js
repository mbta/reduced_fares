import { faker } from '@faker-js/faker';
import { getRandomApplicantAge } from '../../common/birthdate-constants';

describe('Youth Pass File Uploads', () => {
    
    // this test follows the in-person false flow
    it('proceeds through an application', () => {
        const youthPassUrl = Cypress.env('youth_pass_url');
        const applicantFirstName = faker.name.firstName();
        const applicantLastName = faker.name.lastName();
        const applicantEmailAddress = `Automation_Testing_${faker.datatype.number()}@example.com`;
        const applicantPhoneNumber = faker.phone.phoneNumberFormat();
        const applicantBirthdate = getRandomApplicantAge().applicantBirthdate18to25;
        const applicantStreetAddress = `${faker.datatype.number()} ${faker.address.streetName()} ${faker.address.streetSuffix()}`;
        const applicantCity = faker.address.city();
        const applicantZipCode = '02149';
        
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
                
        cy.get('#element101').type(applicantStreetAddress).blur();
        cy.get('#element103').type(applicantCity).blur();
        cy.get('#element154').type(applicantZipCode).blur();
        cy.get('#element122_Yes').click().blur();
        cy.get('#form-section-7 > .form-section-buttons > .form-section-next').click();
    });
    
    it('fails to upload a DOCX file to proof of age', () => {
        cy.get('#element114_Option_1').click().blur();
        cy.get('#element133').attachFile('youth-pass-test-file.docx');
        cy.get('.k-text-error').should('exist');
        cy.get('#form-element-wrapper_133').within(() => {
            cy.get('.k-upload-status > .k-button').click();
        });
        cy.get('.k-text-error').should('not.exist');
    });
    
    it('successfully uploads a GIF file to proof of age', () => {
        cy.get('#element133').attachFile('youth-pass-test-image.gif');
        cy.get('.k-text-success').should('exist');
        cy.get('#form-element-wrapper_133').within(() => {
            cy.get('.k-upload-status > .k-button').click();
            cy.get('.k-text-success').should('not.exist');
        })
    });
        
    it('fails to upload an HTML file to proof of age', () => {
        cy.get('#element133').attachFile('youth-pass-test-file.html');
        cy.get('.k-text-error').should('exist');
        cy.get('#form-element-wrapper_133').within(() => {
            cy.get('.k-upload-status > .k-button').click();
            cy.get('.k-text-error').should('not.exist');
        })
    });

    it('successfully uploads a JPEG file to proof of age', () => {
        cy.get('#element133').attachFile('youth-pass-test-image.jpeg')
        cy.get('.k-text-success').should('exist');
        cy.get('#form-section-8 > .form-section-buttons > .form-section-next').click();
    });
      
    it('fails to upload a DOCX file to proof of address', () => {
        cy.get('#element135_Option_1').click().blur();
        cy.get('#element39').attachFile('youth-pass-test-file.js');
        cy.get('.k-text-error').should('exist');
        cy.get('#form-element-wrapper_39').within(() => {
            cy.get('.k-upload-status > .k-button').click();
            cy.get('.k-text-error').should('not.exist');
        });
    });

    it('successfully uploads a JPG file to proof of address', () => {
        cy.get('#element39').attachFile('youth-pass-test-image.jpg');
        cy.get('.k-text-success').should('exist');
        cy.get('#form-element-wrapper_39').within(() => {
            cy.get('.k-upload-status > .k-button').click();
            cy.get('.k-text-success').should('not.exist');
        });
    });

    it('fails to upload a JSON file to proof of address', () => {
        cy.get('#element39').attachFile('youth-pass-test-file.json');
        cy.get('.k-text-error').should('exist');
        cy.get('#form-element-wrapper_39').within(() => {
            cy.get('.k-upload-status > .k-button').click();
            cy.get('.k-text-error').should('not.exist');
        });
    });

    it('successfully uploads a PDF file to proof of address', () => {
        cy.get('#element39').attachFile('youth-pass-test-image.pdf')
        cy.get('.k-text-success').should('exist');
        cy.get('#form-section-9 > .form-section-buttons > .form-section-next').click();
    });

    it('fails to upload an RTF file to proof of program enrollment', () => {
        cy.get('#element42').select('Child Care (DTA, EEC)', { force: true });
        cy.get('#element136').attachFile('youth-pass-test-file.rtf')
        cy.get('.k-text-error').should('exist');
        cy.get('#form-element-wrapper_136').within(() => {
            cy.get('.k-upload-status > .k-button').click();
            cy.get('.k-text-error').should('not.exist');
        })
    });

    it('fails to upload an XLSX file to proof of program enrollment', () => {
        cy.get('#element136').attachFile('youth-pass-test-file.xlsx')
        cy.get('#form-element-wrapper_136').within(() => {
            cy.get('.k-text-error').should('exist');
        })
    });
});
