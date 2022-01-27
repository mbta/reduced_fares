/**
 * Return a range of Youth Pass applicant ages (12-17, 18-25, too old, too young) for automation testing
*/
export function getRandomApplicantAge() {
    const faker = require('faker');
    const todaysDate = new Date();
    const baselineYear = getBaselineYear();
    const twelveYearsAgo = baselineYear - 12;
    const eighteenYearsAgo = baselineYear - 18; 
    const twentySixYearsAgo = baselineYear - 26; 
    const fiftyYearsAgo = baselineYear - 50;
    const sixtyFiveYearsAgo = baselineYear - 65;
    const ninetyYearsAgo = baselineYear - 90;
    const currentDate = `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}/${todaysDate.getFullYear()}`;
    const randomDateTooYoung = faker.date.between(`${twelveYearsAgo}-11-02`, currentDate);
    const randomDateTooOld = faker.date.between(`${fiftyYearsAgo}-01-01`, `${twentySixYearsAgo}-11-01`);
    const randomDate12to17 = faker.date.between(`${eighteenYearsAgo}-11-02`, `${twelveYearsAgo}-11-01`);
    const randomDate18to25 = faker.date.between(`${twentySixYearsAgo}-11-02`, `${eighteenYearsAgo}-11-01`);
    const randomDate65to90 = faker.date.between(`${ninetyYearsAgo}-11-02`, `${sixtyFiveYearsAgo}-11-01`);
    const applicantBirthdateTooYoung = `${randomDateTooYoung.getMonth() + 1}/${randomDateTooYoung.getDate()}/${randomDateTooYoung.getFullYear()}`;    
    const applicantBirthdateTooOld = formatDate(randomDateTooOld);
    const applicantBirthdate12to17 = formatDate(randomDate12to17);
    const applicantBirthdate18to25 = formatDate(randomDate18to25);
    const applicantBirthdate65to90 = formatDate(randomDate65to90);
    
    
    /** Return the year in which a Youth Pass program year begins (e.g., 2021-22 program year begins in 2021)
     Youth Pass eligibility and age groupings are based off a static date (e.g., 2021-22 based on Nov 1, 2021)
     baseline year constant is necessary to prevent false failures across Youth Pass automation caused by calendar year changeover
    */
    function getBaselineYear() {
        const todaysDate = new Date();
        let programYearStart = null;
        if ((todaysDate.getMonth() + 1) < 10) {
            programYearStart = todaysDate.getFullYear() - 1;
        } else {
            programYearStart = todaysDate.getFullYear();        
        }
        return programYearStart;
    }

    /**
     * Formats a date as a string in M/D/YYYY format
     */
    function formatDate(date) {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    return {
        applicantBirthdateTooYoung,
        applicantBirthdateTooOld,
        applicantBirthdate12to17,
        applicantBirthdate18to25,
        applicantBirthdate65to90
    };
};
