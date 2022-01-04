import { getRandomApplicantAge } from '../../common/birthdate-constants';

describe('Eligibility Checker Blockers', () => {
    const faker = require('faker');
    const youthPassUrl = Cypress.env('youth_pass_url');
    const eligibleZipCode = '02114'; 

    it('enters a random ineligible zip code', () => {
        const ineligibleZipCode = Math.floor(Math.random() * 90000) + 10000;

        cy.visit(youthPassUrl);
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-element-wrapper_182').should('not.be.visible');

        cy.get('#element105').type(ineligibleZipCode).blur();
        cy.get('#form-element-wrapper_182').should('be.visible');
        cy.get('#form-section-2 > .form-section-buttons > .form-section-next').should('not.be.visible');
    });
    
    it('enters an age below 12', () => {
        const ineligibleBirthdateTooYoung = getRandomApplicantAge().applicantBirthdateTooYoung;
            
        cy.reload();
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(eligibleZipCode).blur();
        cy.get('#form-element-wrapper_171').should('not.be.visible');

        cy.get('#element15').type(ineligibleBirthdateTooYoung).blur();
        cy.get('#form-element-wrapper_171').should('be.visible');
        cy.get('#form-section-2 > .form-section-buttons > .form-section-next').should('not.be.visible');
});

    it('enters an age above 25', () => {
        const ineligibleBirthdateTooOld = getRandomApplicantAge().applicantBirthdateTooOld;
        
        cy.reload();
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(eligibleZipCode).blur();
        cy.get('#form-element-wrapper_172').should('not.be.visible');

        cy.get('#element15').type(ineligibleBirthdateTooOld).blur();
        cy.get('#form-element-wrapper_172').should('be.visible');
        cy.get('#form-section-2 > .form-section-buttons > .form-section-next').should('not.be.visible');
    });
    
    it('is able or may be able to get a student pass through school', () => {
        const eligibleBirthdate12to17 = getRandomApplicantAge().applicantBirthdate12to17;
        
        cy.reload();
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(eligibleZipCode).blur();
        cy.get('#element15').type(eligibleBirthdate12to17).blur();
        cy.get('#form-section-2 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-element-wrapper_161').should('not.be.visible');
        cy.get('#form-element-wrapper_162').should('not.be.visible');
        
        cy.get('#element159_Yes').click().blur();
        cy.get('#element160_Yes').click().blur();
        cy.get('#form-element-wrapper_161').should('be.visible');

        cy.get('#element160_Unsure').click().blur();
        cy.get('#form-element-wrapper_162').should('be.visible');
        cy.get('#form-section-3 > .form-section-buttons > .form-section-next').should('not.be.visible');
    });

    it('does not participate in a partner program', () => {
        const eligibleBirthdate18to25 = getRandomApplicantAge().applicantBirthdate18to25;

        cy.reload();
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-section-1 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type(eligibleZipCode).blur();
        cy.get('#element15').type(eligibleBirthdate18to25).blur();
        cy.get('#form-section-2 > .form-section-buttons > .form-section-next').click();
        cy.get('#form-element-wrapper_165').should('not.be.visible');
        
        cy.get('#element164_No').click().blur();
        cy.get('#form-element-wrapper_165').should('be.visible');
        cy.get('#form-section-4 > .form-section-buttons > .form-section-next').should('not.be.visible');
    });
});

