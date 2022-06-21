const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  video: false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  env: {
    youth_pass_url:
      'https://mbta.preprod.simpligov.com/preprod/portal/ShowWorkFlow/AnonymousEmbed/86cadfa6-e8ea-46f1-b6e8-62498f066962',
    youth_pass_dashboard_url:
      'https://mbta.preprod.simpligov.com/preprod/portal/Dashboard',
    malden_test_username: 'maldentestuser@mbta.com',
    malden_test_credentials: 'MaldenTest1!',
    senior_url:
      'https://mbta.preprod.simpligov.com/preprod/portal/ShowWorkFlow/AnonymousEmbed/4fd3d3fb-6b6a-4521-b214-896099a22af8',
    blind_url:
      'https://mbta.preprod.simpligov.com/preprod/portal/ShowWorkFlow/AnonymousEmbed/bc44cab3-9a58-4022-bd9f-e91699d681a1',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/automated-tests/**/*.cy.{js,jsx,ts,tsx}',
  },
})
