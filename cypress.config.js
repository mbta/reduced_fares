const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  video: false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  env: {
    youth_pass_url:
      'https://mbta.prod.simpligov.com/prod/portal/ShowWorkFlow/AnonymousEmbed/e5e2dba6-5424-48d6-80d9-16a27e0fdd84',
    youth_pass_dashboard_url:
      'https://mbta.preprod.simpligov.com/preprod/portal/Dashboard',
    malden_test_username: 'maldentestuser@mbta.com',
    malden_test_credentials: 'MaldenTest1!',
    senior_url:
      'https://mbta.prod.simpligov.com/prod/portal/ShowWorkFlow/AnonymousEmbed/fc6ff5b0-f3bd-436d-8201-b6a4b98bc7fa',
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
