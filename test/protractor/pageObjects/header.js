const Header = function() {

  this.getNumCartItems = () => {
    return $('a.shopping_cart_link').getText();
  };

  this.clickCart = () => {
    return $('a.shopping_cart_link').click();
  };

}
module.exports = new Header();
