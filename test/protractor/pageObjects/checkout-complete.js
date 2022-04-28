const CheckoutComplete = function() {
  const EC = protractor.ExpectedConditions;

  this.waitForLoad = (timeout = 1000) => {
    return browser.wait(EC.visibilityOf($('div#checkout_complete_container')), timeout);
  };

};
module.exports = new CheckoutComplete();
