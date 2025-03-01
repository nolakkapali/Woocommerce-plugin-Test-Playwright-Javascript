import { test, expect, devices } from '@playwright/test';
import { CartPage } from "../../../ClaypotstorePages/Cart"
import { Checkout } from '../../../ClaypotstorePages/Checkout'
import { ProductPage } from "../../../ClaypotstorePages/ProductShop";
import { HomePage } from "../../../ClaypotstorePages/HomePage"
import { Login } from "../../../ClaypotstorePages/Login"
import { Search_productDisplay } from '../../../ClaypotstorePages/Search_ProductDisplay'


test.use({
  ...devices['iPad (gen 7)'],
});

test.describe("Compatibility_Tablet Test @CompatibilityTablet",()=>{
let page

test.beforeAll("Go to Home Page",async({browser})=>{
  test.setTimeout(90000)
  page=await browser.newPage();//new page created 
  const homepage= new HomePage(page)
  await homepage.gotoHomePage()
  //verify Home page
  //check HomePage URL 
  await expect(page).toHaveURL("http://localhost:10016/")
  //check HomePage Title
  await expect(page).toHaveTitle("ClaypotStore");

})

test.afterAll("User Logs out and Page closes in",async()=>{
    const Userlogin=new Login(page) 
    //logout
    await page.locator(Userlogin.myaccLink).click()
    await Userlogin.logout()
    //page closes
    await page.close()
    
   });

test("User Login",async()=>{
    test.setTimeout(60000)
    const Userlogin=new Login(page)  
     //perform login operation
     await Userlogin.gotoMyAccountPage()
     await Userlogin.logging("nolak123","nolak123")

     //verify successful login --check "hello" text block is visible to user
     const helloText=await page.locator("//p[contains(text(),'Hello')]").isVisible()
     if(helloText)
     {   
       await expect (page.locator("//p[contains(text(),'Hello')]")).toBeVisible()
       //verify successful login--logout link is present
       await expect(page.locator(Userlogin.logoutLink)).toBeVisible()
     }
     //If login fails 
     else
     { 
       console.log(`For nolak123 valid data, Login doesn't pass so this is a DEFECT!!`)
     }

     //pause-1sec
     await page.waitForTimeout(1000)

}); 

test("Visit Shop",async()=>{
    test.setTimeout(60000)
    const product= new ProductPage(page)
    //goto shop
    await product.shopVisit()
    //check ProductPage URL 
    await expect(page).toHaveURL("http://localhost:10016/shop/")
    //check ProductPage Title
    await expect(page).toHaveTitle("Product Shop – ClaypotStore");
    //check Product Add to Cart Button is visible and Button number is changing
    await expect.soft(page.locator(product.product_addCart_button)).toBeVisible()
    await product.addtocartButton()
    const homepage= new HomePage(page)
    await homepage.gotoHomePage()
})

test("Search Product and visit Product Display Page",async()=>{
    test.setTimeout(60000)
    const search =new Search_productDisplay (page)
    await search.searching("Clay Pot 1")
    //pause-2sec
    await page.waitForTimeout(2000)
    //product display page will show after valid data search
    //validate product display page
    await expect(page).toHaveURL("http://localhost:10016/product/clay-pot-1/")
    const homepage= new HomePage(page)
    await homepage.gotoHomePage()
})

test("Visit Cart",async()=>{
    test.setTimeout(60000)
    const cart= new CartPage(page)
    // Go to cart page from header
    await cart.cartVisitByClickableLink()
    await page.reload();
    //validate cart page
    await expect(page).toHaveURL("http://localhost:10016/cart/");
    await expect(page).toHaveTitle("Cart – ClaypotStore");
     //check if cart page is empty
     const ifcartEmpty = await page.locator(cart.emptycart).isVisible();
     if(ifcartEmpty)
     {
        const cartText=await page.locator(cart.emptycart).textContent()
         if(cartText==="Your cart is currently empty!"){
          await cart.productAdd()  
     }
 }
     else {
      console.log("Product is already added!")
     } 

})

test("Order Checkout",async()=>{
    test.setTimeout(60000)
    const OrderCheck=new Checkout(page)
    // Go to checkout page from header
    await OrderCheck.GotoCheckout() 
    //verify checkout page URL,Title and Heading
    await page.reload()
     await expect(page).toHaveURL("http://localhost:10016/checkout/");
     await expect(page).toHaveTitle("Checkout – ClaypotStore");
     await expect(page.locator(OrderCheck.Checkheading)).toBeVisible();
     await expect(page.locator(OrderCheck.Checkheading)).toHaveText("Checkout");
      //email check
      await page.locator(OrderCheck.emailCheck).check()
      //same shipping add and payment--direct bank
      await expect.soft(page.locator(OrderCheck.emailCheck)).toBeChecked()
      await expect.soft(page.locator(OrderCheck.directBank)).toBeChecked()
      //place order
      await page.locator(OrderCheck.placeOrder).click()
      //pause 5 sec
      await page.waitForTimeout(5000)
      //verify order checkout
      await expect.soft(page.locator(OrderCheck.orderConfirm)).toBeVisible()
      await expect.soft(page.locator(OrderCheck.orderConfirm)).toHaveText("Thank you. Your order has been received.")

}) 
});    


