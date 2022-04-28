const Inventory = function() {
  const EC = protractor.ExpectedConditions;
  const sortDropdownSelector = 'select[data-test="product_sort_container"]';

  this.waitForLoad = (timeout) => {
    return browser.wait(EC.visibilityOf($('div#inventory_container')), timeout);
  };

  this.clickSortMenu = async () => {
    return await element(by.css(sortDropdownSelector)).click();
  };

  this.clickSortOption = async (option) => {
    return element(by.cssContainingText(`${sortDropdownSelector} option`, option)).click();
  };

};
module.exports = new Inventory();
