import { submitApplication } from '../../common/submit-application';

describe.skip('Youth Pass Document Viewer S3 URL Visibility', () => {
    const faker = require('faker');
    const applicantFirstName = faker.name.firstName();
    const applicantLastName = faker.name.lastName();
    
    it('submits an application with three supporting documents', () => {
        const applicantZipCode = '02148';
        submitApplication(applicantZipCode, applicantFirstName, applicantLastName);
    });

    it('sees three document viewer URLs when logged in as a group admin', () => {
        const youthPassDashboard = Cypress.env('youth_pass_dashboard_url');
        cy.visit(youthPassDashboard);
        cy.get('#username').type(Cypress.env('malden_test_username'));
        cy.get('#password').type(Cypress.env('malden_test_credentials'));
        cy.get('#login').click();
        
        // find and approve application
        cy.get('[aria-rowindex="1"]').should('contain', applicantFirstName)
        cy.get('.mytasksboard > .records').click();
        cy.get('#dx-col-87').click();
        cy.wait(2000);
        cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > [aria-rowindex="1"] > .actions-column > .edit-task > span').click();
        cy.get('#element189_Option_1').click();
        cy.get('.form-submit-button').click();
        cy.get('#thank-you-text').should('be.visible');
        cy.wait(2000);
        cy.get('.exit-workflow-text').click();
        cy.wait(2000);
        cy.get('#yesBtn').click();
        cy.wait(2000);
        
        // view audit trail and assert
        cy.get('.dashboard > .records').click();
        cy.get('[aria-rowindex="1"]').should('contain', 'Approved (pick up later)')
        cy.get('.mytasksboard > .records').click();
        cy.get('#dx-col-87').click();
        cy.wait(2000);
        cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > [aria-rowindex="1"] > .actions-column > .edit-task > span').click();
        cy.get('#show-info-btn').click();
        cy.get(':nth-child(5) > .wrapper-switcher').click();
        cy.get('#AuditLogDiv > :nth-child(5)').should('contain', 'ProofOfAgeS3URL')
        cy.get('#AuditLogDiv > :nth-child(5)').should('contain', 'ProofOfResidencyS3URL')
        cy.get('#AuditLogDiv > :nth-child(5)').should('contain', 'ProofOfEligibilityS3URL')
    });
});
