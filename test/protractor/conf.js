const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['specs/test.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  onPrepare: function () {
    browser.ignoreSynchronization = true;
    jasmine.getEnv().addReporter(new SpecReporter());
  },

  params: {
    user: 'standard_user',
    password: 'secret_sauce'
  }
};
