const Home = function() {

  this.get = () => {
    return browser.get('http://www.saucedemo.com');
  };

  this.waitForLoad = (timeout = 1000) => {
    return browser.wait(() => {
      return $('div.login_wrapper').isPresent();
    }, timeout);
  };

  this.enterUsername = (username) => {
    const selector = 'input[data-test="username"]';
    return $(selector).sendKeys(username);
  };

  this.enterPassword = (password) => {
    const selector = 'input[data-test="password"]';
    return $(selector).sendKeys(password);
  };

  this.clickLogin = () => {
    const selector = 'input[data-test="login-button"]';
    return $(selector).click();
  };

};
module.exports = new Home();
