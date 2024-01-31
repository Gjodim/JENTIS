const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1024,
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  requestTimeout: 20000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://thinking-tester-contact-list.herokuapp.com/',
  },
});
