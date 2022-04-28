const CheckoutOne = function() {
  const EC = protractor.ExpectedConditions;

  this.waitForLoad = (timeout = 1000) => {
    return browser.wait(EC.visibilityOf($('div#checkout_info_container')), timeout);
  };

  this.enterFirstName = (firstName) => {
    return $('input[data-test="firstName"]').sendKeys(firstName);
  };

  this.enterLastName = (lastName) => {
    return $('input[data-test="lastName"]').sendKeys(lastName);
  };

  this.enterPostalCode = (postalCode) => {
    return $('input[data-test="postalCode"]').sendKeys(postalCode);
  };

  this.clickContinue = () => {
    return $('input[data-test="continue"]').click();
  };

};
module.exports = new CheckoutOne();
