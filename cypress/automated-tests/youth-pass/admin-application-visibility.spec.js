import { submitApplication } from '../../common/submit-application';

describe('Youth Pass Admin Application Visibility', () => {
    const faker = require('faker');
    const maldenApplicantFirstName = faker.name.firstName();
    const maldenApplicantLastName = faker.name.lastName();
    const melroseApplicantFirstName = faker.name.firstName();
    const melroseApplicantLastName = faker.name.lastName();
    
    it('submits an application for Malden', () => {
        const maldenZipCode = '02148';
        submitApplication(maldenZipCode, maldenApplicantFirstName, maldenApplicantLastName);
    });
    
    it('submits an application for Melrose', () => {
        const melroseZipCode = '02176';
        submitApplication(melroseZipCode, melroseApplicantFirstName, melroseApplicantLastName);
    });

    it('sees only the Malden application when logged in as a Malden group admin', () => {
        const youthPassDashboard = Cypress.env('youth_pass_dashboard_url');
        cy.visit(youthPassDashboard);
        cy.get('#username').type(Cypress.env('malden_test_username'));
        cy.get('#password').type(Cypress.env('malden_test_credentials'));
        cy.get('#login').click();
        cy.get('[aria-rowindex="1"]').should('contain', maldenApplicantFirstName)
        cy.get('[aria-rowindex="1"]').should('contain', maldenApplicantLastName)
        cy.get('.dx-datagrid-content').should('not.contain', melroseApplicantFirstName)
        cy.get('.dx-datagrid-content').should('not.contain', melroseApplicantLastName)
    });
});
