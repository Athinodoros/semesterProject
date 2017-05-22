'use strict';

const webdriver = require('selenium-webdriver'); // Get the Selenium driver
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path; // Get the Chrome driver
const assert = require('assert');
const test = require('selenium-webdriver/testing');

test.describe('Routing', () => {
  test.it('should open the default browser on the "start page" of the application', done => {
    const driver = new webdriver.Builder() // The driver controls the execution
        .withCapabilities(webdriver.Capabilities.chrome())
        .build(); // Build runs the Chrome application
    driver.get('http://localhost:3000/');
    driver.getTitle().then(title => {
      assert.equal(title, 'Semester Project');
    });
    driver.quit(); // Quits the driver and thereby stops the process from running
    done();
  });

  test.it('should open the default browser on the "query 1 page" of the application', done => {
    const driver = new webdriver.Builder() // The driver controls the execution
        .withCapabilities(webdriver.Capabilities.chrome())
        .build(); // Build runs the Chrome application
    driver.get('http://localhost:3000/query1');
    const queryHeader = driver.findElement(webdriver.By.id('query1Specific'));
    queryHeader.getText().then(text => assert.equal(text, 'Given a city name your application returns all ' +
        'book titles with corresponding authors that mention this city.'));
    driver.quit(); // Quits the driver and thereby stops the process from running
    done();
  });
});

test.describe('Mongo DB Queries', () => {
  test.it('should show at least one book when searching for books mentioning "Athens"', done => {
    const driver = new webdriver.Builder() // The driver controls the execution
        .withCapabilities(webdriver.Capabilities.chrome())
        .build(); // Build runs the Chrome application
    driver.get('http://localhost:3000/query1');
    const inputField = driver.findElement(webdriver.By.name('city'));
    inputField.sendKeys('Athens');
    const button = driver.findElement(webdriver.By.id('enter'));
    button.click();
    const book1 = driver.wait(webdriver.until.elementLocated(webdriver.By.id('book1')), 1000);
    book1.getText().then(text => assert.equal(text, '"test book three", written by RichyDoricous'));
    driver.quit(); // Quits the driver and thereby stops the process from running
    done();
  });

  /*test.it('should show at least one book when searching for books mentioning "London"', done => {
    const driver = new webdriver.Builder() // The driver controls the execution
        .withCapabilities(webdriver.Capabilities.chrome())
        .build(); // Build runs the Chrome application
    driver.get('http://localhost:3000/query1');
    const inputField = driver.findElement(webdriver.By.name('city'));
    inputField.sendKeys('London');
    const button = driver.findElement(webdriver.By.id('enter'));
    button.click();
    driver.wait(webdriver.until.elementLocated(webdriver.By.id('book1')), 1000)
        .getText()
        .then(text => assert.equal(text, '"test book two", written by Benthinodoros'));
    driver.quit(); // Quits the driver and thereby stops the process from running
    done();
  });*/
});
