export function getRandomApplicantAge() {
    const faker = require('faker');
    const todaysDate = new Date();
    const twelveYearsAgo = todaysDate.getFullYear() - 12;
    const eighteenYearsAgo = todaysDate.getFullYear() - 18; 
    const twentySixYearsAgo = todaysDate.getFullYear() - 26; 
    const fiftyYearsAgo = todaysDate.getFullYear() - 50;
    const currentDate = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}/${todaysDate.getFullYear()}`;
    const randomDateTooYoung = faker.date.between(`${twelveYearsAgo}-11-02`, currentDate);
    const randomDateTooOld = faker.date.between(`${fiftyYearsAgo}-01-01`, `${twentySixYearsAgo}-11-01`);
    const randomDate12to17 = faker.date.between(`${eighteenYearsAgo}-11-02`, `${twelveYearsAgo}-11-01`);
    const randomDate18to25 = faker.date.between(`${twentySixYearsAgo}-11-02`, `${eighteenYearsAgo}-11-01`);
    const applicantBirthdateTooYoung = `${randomDateTooYoung.getMonth() + 1}/${randomDateTooYoung.getDate()}/${randomDateTooYoung.getFullYear()}`;    
    const applicantBirthdateTooOld = `${randomDateTooOld.getMonth() + 1}/${randomDateTooOld.getDate()}/${randomDateTooOld.getFullYear()}`;    
    const applicantBirthdate12to17 = `${randomDate12to17.getMonth() + 1}/${randomDate12to17.getDate()}/${randomDate12to17.getFullYear()}`;    
    const applicantBirthdate18to25 = `${randomDate18to25.getMonth() + 1}/${randomDate18to25.getDate()}/${randomDate18to25.getFullYear()}`;    
    
    return {applicantBirthdateTooYoung, applicantBirthdateTooOld, applicantBirthdate12to17, applicantBirthdate18to25}
}
