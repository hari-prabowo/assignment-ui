const Home = function() {

  this.get = async () => {
    return await browser.get('http://www.saucedemo.com');
  };

  this.waitForLoad = (timeout) => {
    return browser.wait(() => {
      return element(by.css('div.login_wrapper')).isPresent();
    }, timeout);
  };

  this.enterUsername = async (username) => {
    const selector = 'input[data-test="username"]';
    return element(by.css(selector)).sendKeys(username);
  };

  this.enterPassword = async (password) => {
    const selector = 'input[data-test="password"]';
    return element(by.css(selector)).sendKeys(password);
  };

  this.clickLogin = () => {
    const selector = 'input[data-test="login-button"]';
    return element(by.css(selector)).click();
  };

};
module.exports = new Home();
