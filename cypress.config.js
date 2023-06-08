const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'eg4k6g',
  "experimentalSourceRewriting": true,
  "defaultCommandTimeout": 10000,
  "pageLoadTimeout": 90000,
  e2e: {
    //watchForFileChanges:false
    //baseUrl: 'https://www.saucedemo.com/'
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
