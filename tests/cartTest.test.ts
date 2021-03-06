import { GoDaddy } from './pageObjects/placeholder';
//Justin//
import { Builder, Capabilities, until, WebDriver } from "selenium-webdriver";

const chromedriver = require("chromedriver");
const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

  const page = new GoDaddy(driver);

  describe("GoDaddy", ()=>{
    jest.setTimeout(15000);
    beforeEach(async () => {
      await page.navigate();
    });
    afterAll(async () => {
      await driver.quit();
    });

    test("Adds Items to Cart", async()=>{
      //add item to cart
      await driver.wait(until.elementLocated(page.wordPress));
      await (await driver.findElement(page.wordPress)).click();
      await driver.wait(until.elementLocated(page.addCart));
      await (await driver.findElement(page.addCart)).click();
      await driver.wait(until.elementLocated(page.continueButton));
      await (await driver.findElement(page.continueButton)).click();
      await driver.wait(until.elementLocated(page.nothanksLink));
      await (await driver.findElement(page.nothanksLink)).click();
      
      let cartItemList = await page.getCartList();
      //console.log("Cart ",cartItemList);
      expect(cartItemList).toContain("Basic Managed WordPress Websites");

      // await driver.wait(until.elementLocated(page.checkoutItems))
      // expect(await (await driver.findElement(page.checkoutItems)).getText()).toContain("Basic Managed WordPress Websites");
    });

    test("Removes Items from Cart", async()=>{
      //add item to cart
      await driver.wait(until.elementLocated(page.webHosting));
      await (await driver.findElement(page.webHosting)).click();
      await driver.wait(until.elementLocated(page.webAdd));
      await (await driver.findElement(page.webAdd)).click();
      await driver.wait(until.elementLocated(page.continueButton));
      await (await driver.findElement(page.continueButton)).click();
      await driver.wait(until.elementLocated(page.nothanksLink));
      await (await driver.findElement(page.nothanksLink)).click();

      // await driver.wait(until.elementLocated(page.checkoutPage));
      // await (await driver.findElement(page.checkoutPage)).click();
      

      //delete item from cart
      await driver.wait(until.elementLocated(page.trashButton))
      await (await driver.findElement(page.trashButton)).click();

      // let cartItemList = await page.getCartList();
      // console.log("Cart ",cartItemList);
      // let getItem = await (await page.driver.findElement(page.checkoutItems)).getText();
      // console.log("Cart3", getItem);
      // expect(await (await driver.findElement(page.checkoutItems)).getText()).not.toContain("Basic Managed WordPress Websites");

      //test it
      await driver.wait(until.elementLocated(page.checkoutItems))
      expect(await (await driver.findElement(page.checkoutItems)).getText()).not.toContain("Economy Linux Hosting with cPanel");

      //let cartItemList = await page.getCartList();
      // console.log("Cart ",cartItemList);
      // expect(cartItemList).not.toContain("Economy Linux Hosting with cPanel");

    })

    // test("Empty Cart Button",async()=>{
      
    //   let cartlist = await page.getCartList();
    //   await page.emptyCart();
    //   let cartItemList = await page.getCartList();
    //   //console.log("Cart ",cartItemList);
    //   expect(cartItemList).toContain("Basic Managed WordPress Websites");
    // })

  });