const utils = require('../utils');
const home = require('../pageObjects/home');
const inv = require('../pageObjects/inventory');
const invItem = require('../pageObjects/inventory-item');
const header = require('../pageObjects/header');
const cart = require('../pageObjects/cart');
const checkoutOne = require('../pageObjects/checkout-one');
const checkoutTwo = require('../pageObjects/checkout-two');
const checkoutComplete = require('../pageObjects/checkout-complete');

describe('UI Automation Test', () => {
  const EC = protractor.ExpectedConditions;

  beforeAll(() => {
    browser.ignoreSynchronization = true;
  });

  it('should be able to load the site', async () => {
    await home.get();
    expect(home.waitForLoad(3000)).toBeTruthy();
  });

  it('should be able to login with a valid account', async () => {
    await home.enterUsername('standard_user');
    await home.enterPassword('secret_sauce');
    await home.clickLogin();
    expect(inv.waitForLoad()).toBeTruthy();
  });

  let firstItem;
  it('should be able to sort products by highest price', async () => {
    await inv.clickSortMenu();
    await inv.clickSortOption('Price (high to low)');

    firstItem = await inv.getFirstItem();
    const lastItem = await inv.getLastItem();
    expect(parseInt(firstItem.price.substring(1)))
      .toBeGreaterThan(parseInt(lastItem.price.substring(1)));
  });

  it('should be able to open the first result', async () => {
    await inv.clickItemByName(firstItem.name);
    expect(invItem.waitForLoad()).toBeTruthy();

    const itemDetails = await invItem.getItemDetails();
    expect(itemDetails.name).toEqual(firstItem.name);
    expect(itemDetails.price).toEqual(firstItem.price);
  });

  it('should be able to add product to cart', async () => {
    await invItem.clickAddToCart();
    expect(header.getNumCartItems()).toEqual('1');
  });

  it('should be able to view cart page containing the expected items', async () => {
    await header.clickCart();
    expect (cart.waitForLoad()).toBeTruthy();

    const items = await cart.getItems();
    expect(items.length).toEqual(1);
    expect(items[0].name).toEqual(firstItem.name);
    expect(items[0].price).toEqual(firstItem.price);
  });

  it('should be able to checkout', async () => {
    await cart.clickCheckout();
    expect(checkoutOne.waitForLoad()).toBeTruthy();
    await checkoutOne.enterFirstName('Hari');
    await checkoutOne.enterLastName('Prabowo');
    await checkoutOne.enterPostalCode('98121');
    await checkoutOne.clickContinue();
    expect(checkoutTwo.waitForLoad()).toBeTruthy();
  });

  it('should show correct details on the checkout page and take a screenshot', async () => {
    const items = await checkoutTwo.getItems();
    expect(items.length).toEqual(1);
    expect(items[0].name).toEqual(firstItem.name);
    expect(items[0].price).toEqual(firstItem.price);
    utils.takeScreenshot('test-screenshot.png');
  });

  it('should be able to complete purchase for the expected items', async () => {
    await checkoutTwo.clickFinish();
    expect(checkoutComplete.waitForLoad()).toBeTruthy();
  });
});
