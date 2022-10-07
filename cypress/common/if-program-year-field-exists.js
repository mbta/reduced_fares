/**
 * Executes the callback only if the program year selection element exists on the page.
 * 
 * @callback ifProgramYearExistsCallback
 * 
 * @param {ifProgramYearExistsCallback} callback Callback function to be executed only if the element exists.
*/
export function ifProgramYearFieldExists(callback) {
  if (multipleProgramYears()) {
      callback();
  };

  /** 
   * Return true or false to determine if applicant can select multiple program years
   * i.e., if test is running between 10/01 and 10/14
  */
   function multipleProgramYears() {
      const todaysDate = new Date();
      return todaysDate.getMonth() + 1 == 10 && todaysDate.getDate() <= 14
  };
}
