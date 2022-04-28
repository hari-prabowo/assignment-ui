const InventoryItem = function() {
  const EC = protractor.ExpectedConditions;

  this.waitForLoad = (timeout = 1000) => {
    return browser.wait(EC.visibilityOf($('div#inventory_item_container')), timeout);
  };

  this.getItemDetails = async () => {
    return {
      "name": await $('div.inventory_details_name').getText(),
      "desc": await $('div.inventory_details_desc').getText(),
      "price": await $('div.inventory_details_price').getText(),
    };
  };

  this.clickAddToCart = () => {
    return element(by.cssContainingText('button', 'Add to cart')).click();
  };

};
module.exports = new InventoryItem();
