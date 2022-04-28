const Inventory = function() {
  const EC = protractor.ExpectedConditions;
  const sortDropdownSelector = 'select[data-test="product_sort_container"]';

  this.waitForLoad = (timeout = 1000) => {
    return browser.wait(EC.visibilityOf($('div#inventory_container')), timeout);
  };

  this.clickSortMenu = () => {
    return $(sortDropdownSelector).click();
  };

  this.clickSortOption = (option) => {
    return element(by.cssContainingText(`${sortDropdownSelector} option`, option)).click();
  };

  this.getFirstItem = async () => {
    const item = await $$('div.inventory_item').first();
    const name = await item.$('div.inventory_item_name').getText();
    const price = await item.$('div.inventory_item_price').getText();
    return {
      "name": name,
      "price": price
    }
  }

  this.getLastItem = async () => {
    const name = await $$('div.inventory_item_name').last().getText();
    const price = await $$('div.inventory_item_price').last().getText();
    return {
      "name": name,
      "price": price
    }
  }

  this.clickItemByName = (name) => {
    return element(by.cssContainingText('div.inventory_item_name', name)).click();
  };

};
module.exports = new Inventory();
