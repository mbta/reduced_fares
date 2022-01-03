// returns a range of Youth Pass applicant ages (12-17, 18-25, too old, too young) for automation testing
export function getRandomApplicantAge() {
    const faker = require('faker');
    const todaysDate = new Date();
    const baselineYear = getBaselineYear();
    const twelveYearsAgo = baselineYear - 12;
    const eighteenYearsAgo = baselineYear - 18; 
    const twentySixYearsAgo = baselineYear - 26; 
    const fiftyYearsAgo = baselineYear - 50;
    const currentDate = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}/${todaysDate.getFullYear()}`;
    const randomDateTooYoung = faker.date.between(`${twelveYearsAgo}-11-02`, currentDate);
    const randomDateTooOld = faker.date.between(`${fiftyYearsAgo}-01-01`, `${twentySixYearsAgo}-11-01`);
    const randomDate12to17 = faker.date.between(`${eighteenYearsAgo}-11-02`, `${twelveYearsAgo}-11-01`);
    const randomDate18to25 = faker.date.between(`${twentySixYearsAgo}-11-02`, `${eighteenYearsAgo}-11-01`);
    const applicantBirthdateTooYoung = `${randomDateTooYoung.getMonth() + 1}/${randomDateTooYoung.getDate()}/${randomDateTooYoung.getFullYear()}`;    
    const applicantBirthdateTooOld = `${randomDateTooOld.getMonth() + 1}/${randomDateTooOld.getDate()}/${randomDateTooOld.getFullYear()}`;    
    const applicantBirthdate12to17 = `${randomDate12to17.getMonth() + 1}/${randomDate12to17.getDate()}/${randomDate12to17.getFullYear()}`;    
    const applicantBirthdate18to25 = `${randomDate18to25.getMonth() + 1}/${randomDate18to25.getDate()}/${randomDate18to25.getFullYear()}`;    
    
    // returns the year in which a Youth Pass program year begins (e.g., 2021-22 program year begins in 2021)
    // Youth Pass eligibility and age groupings are based off a static date (e.g., 2021-22 based on Nov 1, 2021)
    // baseline year constant is necessary to prevent false failures across Youth Pass automation caused by calendar year changeover
    function getBaselineYear() {
        const todaysDate = new Date();
        let programYearStart = null;
        if ((todaysDate.getMonth() + 1) < 10) {
            programYearStart = todaysDate.getFullYear() - 1;
        } else {
            programYearStart = todaysDate.getFullYear();        
        }
        return programYearStart;
    };

    return {applicantBirthdateTooYoung, applicantBirthdateTooOld, applicantBirthdate12to17, applicantBirthdate18to25}
}
