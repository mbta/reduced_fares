const faker = require('faker');
const constants = require('../../common/youth-pass-constants');

describe('Youth Pass Successful Submission', () => {
    it('Submits a Youth Pass Application', () => {
        const youthPassUrl = constants.getYouthPassConstants().youthPassUrl;
        const applicantFirstName = faker.name.firstName();
        const applicantLlastName = faker.name.lastName();
        const applicantEmailAddress = faker.internet.email();
        const applicantPhoneNumber = faker.phone.phoneNumber();
        const randomBirthdate = faker.date.between('1996-11-01', '2004-10-31')
        const applicantBirthdate = `${randomBirthdate.getMonth()}/${randomBirthdate.getDay()}/${randomBirthdate.getFullYear()}`;
        
        cy.visit(youthPassUrl);
        cy.get('#form-section-0 > .form-section-buttons > .form-section-next').click();
        cy.get('#element105').type('02114').blur();
        cy.get('#element15').type(applicantBirthdate).blur();
        cy.get('#element164_Option_1').click().blur();

    });
});

