'use strict';

const webdriver = require('selenium-webdriver'); // Get the Selenium driver
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path; // Get the Chrome driver
const assert = require('assert');
const test = require('selenium-webdriver/testing');

test.describe('Mongo DB Queries', () => {
  test.it('should show two books when searching for books mentioning "Athens"', done => {
    const driver = new webdriver.Builder() // The driver controls the execution
        .withCapabilities(webdriver.Capabilities.chrome())
        .build(); // Build runs the Chrome application
    driver.get('http://localhost:3000/query1'); // Change the URL to google.com
    const inputField = driver.findElement(webdriver.By.name('city'));
    inputField.sendKeys('Athens');
    const button = driver.findElement(webdriver.By.id('enter'));
    button.click();
    // const book1 = driver.findElement(webdriver.By.xpath('//*[@id="book0"]'));
    // const book2 = driver.findElement(webdriver.By.id('1'));
    // console.log(book1);
    // book1.getAttribute('value').then(value => {
    //   console.log("value is: " + value);
      // assert.equal(value, 'simple programmer');
    // });
//*[@id="book0"]
    driver.quit(); // Quits the driver and thereby stops the process from running
    done();
  });
});