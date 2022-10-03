/**
 * Executes the callback only if the element exists on the page.
 * 
 * @callback ifExistsCallback
 * 
 * @param {string} element Selector string for an element on the page.
 * @param {ifExistsCallback} callback Callback function to be executed only if the element exists.
*/
export function ifExists(element, callback) {
  cy.get('body').then((body) => {
    if (body.find(element).length > 0) {
        callback();
    }
  });
};
