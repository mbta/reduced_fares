const faker = require('faker');

describe('Eligibility Checker Blockers', () => {
    const youthPassUrl = Cypress.env('youth_pass_url');
    const eligibleZipCode = '02114';
    const todaysDate = new Date();
    const twelveYearsAgo = todaysDate.getFullYear() - 12; 
    const eighteenYearsAgo = todaysDate.getFullYear() - 18; 
    const twentySixYearsAgo = todaysDate.getFullYear() - 26; 
    const fiftyYearsAgo = todaysDate.getFullYear() - 50; 

    it('enters an ineligible zip code', () => {
        const ineligibleZipCode = '01545';

        cy.visit(youthPassUrl);
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-element-wrapper_182').should('not.be.visible');

        cy.get('#element105').type(ineligibleZipCode).blur();
        cy.get('#form-element-wrapper_182').should('be.visible');
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').should('not.be.visible');
    });
    
    it('enters an age below 12', () => {
        const currentDate = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}/${todaysDate.getFullYear()}`;
        const randomBirthdateTooYoung = faker.date.between(`${twelveYearsAgo}-11-02`, currentDate);
        const ineligibleBirthdateTooYoung = 
            `${randomBirthdateTooYoung.getMonth() + 1}
            /${randomBirthdateTooYoung.getDate()}
            /${randomBirthdateTooYoung.getFullYear()}`.replace(/\s+/g, "");
            
        cy.reload();
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(eligibleZipCode).blur();
        cy.get('#form-element-wrapper_171').should('not.be.visible');

        cy.get('#element15').type(ineligibleBirthdateTooYoung).blur();
        cy.get('#form-element-wrapper_171').should('be.visible');
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').should('not.be.visible');
});

    it('enters an age above 25', () => {
        const randomBirthdateTooOld = faker.date.between(`${fiftyYearsAgo}-01-01`, `${twentySixYearsAgo}-11-01`);
        const ineligibleBirthdateTooOld = 
            `${randomBirthdateTooOld.getMonth() + 1}/
            ${randomBirthdateTooOld.getDate()}/
            ${randomBirthdateTooOld.getFullYear()}`.replace(/\s+/g, "");
        
        cy.reload();
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(eligibleZipCode).blur();
        cy.get('#form-element-wrapper_172').should('not.be.visible');

        cy.get('#element15').type(ineligibleBirthdateTooOld).blur();
        cy.get('#form-element-wrapper_172').should('be.visible');
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').should('not.be.visible');
    });
    
    it('is able or may be able to get a student pass through school', () => {
        const randomEligibleBirthdate12to18 = faker.date.between(`${eighteenYearsAgo}-11-02`, `${twelveYearsAgo}-11-01`);
        const eligibleBirthdate12to18 = 
            `${randomEligibleBirthdate12to18.getMonth() + 1}/
            ${randomEligibleBirthdate12to18.getDate()}/
            ${randomEligibleBirthdate12to18.getFullYear()}`.replace(/\s+/g, "");
        
        cy.reload();
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(eligibleZipCode).blur();
        cy.get('#element15').type(eligibleBirthdate12to18).blur();
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-element-wrapper_161').should('not.be.visible');
        cy.get('#form-element-wrapper_162').should('not.be.visible');
        
        cy.get('#element159_Option_1').click().blur();
        cy.get('#element160_Option_1').click().blur();
        cy.get('#form-element-wrapper_161').should('be.visible');

        cy.get('#element160_Option_3').click().blur();
        cy.get('#form-element-wrapper_162').should('be.visible');
        cy.get('#form-section-2 > .form-section-buttons > .form-section-next').should('not.be.visible');
    });

    it('does not participate in a partner program', () => {
        const randomEligibleBirthdate18to25 = faker.date.between(`${twentySixYearsAgo}-11-02`, `${eighteenYearsAgo}-11-01`);
        const eligibleBirthdate18to25 = 
            `${randomEligibleBirthdate18to25.getMonth() + 1}/
            ${randomEligibleBirthdate18to25.getDate()}/
            ${randomEligibleBirthdate18to25.getFullYear()}`.replace(/\s+/g, "");

        cy.reload();
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(eligibleZipCode).blur();
        cy.get('#element15').type(eligibleBirthdate18to25).blur();
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-element-wrapper_165').should('not.be.visible');
        
        cy.get('#element164_Option_2').click().blur();
        cy.get('#form-element-wrapper_165').should('be.visible');
        cy.get('#form-section-3 > .form-section-buttons > .form-section-next').should('not.be.visible');
    });
});

