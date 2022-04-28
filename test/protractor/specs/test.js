
describe('UI Automation Test', () => {
  const EC = protractor.ExpectedConditions;

  it('should be able to load the site', () => {
    browser.ignoreSynchronization = true;
    browser.get('https://www.saucedemo.com/');
    browser.wait(() => {
      return element(by.css('div.login_wrapper')).isPresent();
    }, 3000);
  });

  it('should be able to login with a valid account', () => {
    const userSelector = 'input[data-test="username"]';
    const passSelector = 'input[data-test="password"]';
    const btnSelector = 'input[data-test="login-button"]';
    element(by.css(userSelector)).sendKeys('standard_user');
    element(by.css(passSelector)).sendKeys('secret_sauce');
    element(by.css(btnSelector)).click();
    browser.wait(EC.urlIs('https://www.saucedemo.com/inventory.html'), 5000);
  });

  it('should be able to sort products by highest price', async () => {
    const dropdownSelector = 'select[data-test="product_sort_container"]';
    element(by.css(dropdownSelector)).click();
    element(by.cssContainingText(`${dropdownSelector} option`, 'Price (high to low)')).click();

    const firstPrice = await element.all(by.css('div.inventory_item_price')).first().getText();
    const lastPrice = await element.all(by.css('div.inventory_item_price')).last().getText();
    expect(parseInt(firstPrice.substring(1))).toBeGreaterThan(parseInt(lastPrice.substring(1)));
  });

  let itemName;
  let itemPrice;
  it('should be able to open the first result', async () => {
    const firstItem = element.all(by.css('div.inventory_item')).first();
    itemName = await firstItem.element(by.css('div.inventory_item_name')).getText();
    itemPrice = await firstItem.element(by.css('div.inventory_item_price')).getText();

    await firstItem.element(by.css('div.inventory_item_img')).click();
    browser.wait(EC.urlContains('https://www.saucedemo.com/inventory-item.html'), 5000);
    const name = await element(by.css('div.inventory_details_name')).getText();
    const price = await element(by.css('div.inventory_details_price')).getText();
    expect(name).toEqual(itemName);
    expect(price).toEqual(itemPrice);
  });

  it('should be able to add product to cart', async () => {
    element(by.cssContainingText('button', 'Add to cart')).click();
    const cartItems = await element(by.css('a.shopping_cart_link')).getText();
    expect(cartItems).toEqual('1');
  });

  it('should be able to view cart page containing the expected items', async () => {
    await element(by.css('a.shopping_cart_link')).click();
    browser.wait(EC.urlContains('https://www.saucedemo.com/cart.html'), 5000);
    const name = await element(by.css('div.inventory_item_name')).getText();
    const price = await element(by.css('div.inventory_item_price')).getText();
    expect(name).toEqual(itemName);
    expect(price).toEqual(itemPrice);
  });

  it('should be able to checkout', () => {
    element(by.css('button[data-test="checkout"]')).click();
    browser.wait(EC.urlContains('https://www.saucedemo.com/checkout-step-one.html'), 5000);
    element(by.css('input[data-test="firstName"]')).sendKeys('Hari');
    element(by.css('input[data-test="lastName"]')).sendKeys('Prabowo');
    element(by.css('input[data-test="postalCode"]')).sendKeys('98121');
    element(by.css('input[data-test="continue"]')).click();
    browser.wait(EC.urlContains('https://www.saucedemo.com/checkout-step-two.html'), 5000);
  });

  it('should be able to complete purchase for the expected items', async () => {
    const name = await element(by.css('div.inventory_item_name')).getText();
    const price = await element(by.css('div.inventory_item_price')).getText();
    expect(name).toEqual(itemName);
    expect(price).toEqual(itemPrice);
    element(by.css('button[data-test="finish"]')).click();
    browser.wait(EC.urlContains('https://www.saucedemo.com/checkout-complete.html'), 5000);
    const text = await element(by.css('div#checkout_complete_container')).getText();
    expect(text.includes('THANK YOU FOR YOUR ORDER')).toBe(true);
    browser.takeScreenshot();
  });
});
