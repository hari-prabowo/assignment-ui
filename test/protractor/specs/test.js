const fs = require('fs');
const home = require('../pageObjects/home');
const inv = require('../pageObjects/inventory');

describe('UI Automation Test', () => {
  const EC = protractor.ExpectedConditions;

  beforeAll(() => {
    browser.ignoreSynchronization = true;
  });

  it('should be able to load the site', () => {
    home.get();
    expect(home.waitForLoad(3000)).toBeTruthy();
  });

  it('should be able to login with a valid account', () => {
    home.enterUsername('standard_user');
    home.enterPassword('secret_sauce');
    home.clickLogin();
    expect(inv.waitForLoad(3000)).toBeTruthy();
  });

  it('should be able to sort products by highest price', async () => {
    inv.clickSortMenu();
    inv.clickSortOption('Price (high to low)');

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

  async function takeScreenshot(filename) {
    const screenshot = await browser.takeScreenshot();
    const stream = await fs.createWriteStream(filename);
    await stream.write(new Buffer.from(screenshot, 'base64'));
    stream.end();
  }

  it('should show correct details on the checkout page and take a screenshot', async () => {
    const name = await element(by.css('div.inventory_item_name')).getText();
    const price = await element(by.css('div.inventory_item_price')).getText();
    expect(name).toEqual(itemName);
    expect(price).toEqual(itemPrice);
    takeScreenshot('test-screenshot.png');
  });

  it('should be able to complete purchase for the expected items', async () => {
    element(by.css('button[data-test="finish"]')).click();
    browser.wait(EC.urlContains('https://www.saucedemo.com/checkout-complete.html'), 5000);
    const text = await element(by.css('div#checkout_complete_container')).getText();
    expect(text.includes('THANK YOU FOR YOUR ORDER')).toBe(true);
  });


});
