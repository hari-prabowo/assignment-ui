const fs = require('fs');

const Utils = function() {

  this.takeScreenshot = async (filename) => {
    const screenshot = await browser.takeScreenshot();
    const stream = await fs.createWriteStream(filename);
    await stream.write(new Buffer.from(screenshot, 'base64'));
    stream.end();
  };

};

module.exports = new Utils();
