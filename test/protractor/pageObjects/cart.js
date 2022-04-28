const Cart = function() {
  const EC = protractor.ExpectedConditions;

  this.waitForLoad = (timeout = 1000) => {
    return browser.wait(EC.visibilityOf($('div.cart_contents_container')), timeout);
  };

  this.getItems = async () => {
    const itemElems = await $$('div.cart_item');
    const items = [];
    for (const itemElem of itemElems) {
      items.push({
        "name": await itemElem.$('div.inventory_item_name').getText(),
        "desc": await itemElem.$('div.inventory_item_desc').getText(),
        "price": await itemElem.$('div.inventory_item_price').getText()
      });
    };
    return items;
  };

  this.clickCheckout = async () => {
    return $('button[data-test="checkout"]').click();
  };

};
module.exports = new Cart();
