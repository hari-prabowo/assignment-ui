# UI Automation Assignment (assignment-ui)

## Setup
1. Clone this repository
2. Under the root directory, run: `npm install`
3. Make sure you have the latest Chrome version installed (version 101 at the time of this writing)

## Running Tests
1. Under the root directory, run: `npm test`
2. After test completes successfully, you can find a screenshot of the Checkout Step 2 page, as test-screenshot.png file under the root directory

## Test Framework
I chose Protractor because it interacts against a real browser session, closely simulating a real user, which is more suitable for testing an external website as requested in this assignment. It is robust, well documented, and also relatively quick and simple to start using with the built-in Jasmine framework.

If the tests were to be written in the same code base as the website or web app being tested, then there are likely other more suitable solutions for end to end testing, such as Cypress.

## Test Automation Approach
The test automation script is written granularly as much as possible, with each test case contained within a single spec. This makes it easy to read, both when writing code and when parsing the test results.
The common page object pattern is used to contain implementation details of element interactions. This improves code reusability and readability, making it easier for anyone to write new tests.

## Improvements
Currently the config file is only set up for running tests on Chrome. Different config files will need to be written for running tests on other browsers like Firefox and Safari. Additional logic will also likely need to be added in the page objects or test scripts to handle the quirks of each browser.
