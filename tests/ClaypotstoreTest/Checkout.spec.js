import {test,expect} from '@playwright/test'
import { HomePage } from "../../ClaypotstorePages/HomePage"
import { Login } from "../../ClaypotstorePages/Login"
import { Checkout } from '../../ClaypotstorePages/Checkout'
import { CartPage } from '../../ClaypotstorePages/Cart';

test.describe("checkoutpage@regression",()=>{
  let page
  let OrderCheck

  test.beforeAll("User Login",async({browser})=>{
    test.setTimeout(90000)
    page=await browser.newPage();//new page created 
    OrderCheck= new Checkout(page)
    //check userlogin
    const Userlogin=new Login(page)
    const homepage=new HomePage(page)
    //go to homepage
    await homepage.gotoHomePage()
    // Go to checkout page 
    await OrderCheck.GotoCheckoutURL()
    const loginMessage = await page.getByText("User Have to Login First!").isVisible();
        //user login
        if (loginMessage) {
            await Userlogin.gotoMyAccountPage();
            await Userlogin.logging("nolak123", "nolak123");
        } else {
            console.log("User is already logged in!");
        }
    
        const cart=new CartPage(page)
        await cart.cartVisitByClickableLink()
        await page.reload()
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
     // Go to checkout page 
     await page.goto("http://localhost:10016/checkout/")  

  });

  test.afterAll("Page closes",async()=>{
    await page.close()
    
   });

   test("Validate Checkout Page URL,Title and Heading",async()=>{
    test.setTimeout(60000)
    OrderCheck=new Checkout(page)
    //pause 2 sec
    await page.waitForTimeout(2000) 
    //verify checkout page URL,Title and Heading
    await expect(page).toHaveURL("http://localhost:10016/checkout/");
    await expect(page).toHaveTitle("Checkout – ClaypotStore");
    await expect(page.locator(OrderCheck.Checkheading)).toBeVisible();
    await expect(page.locator(OrderCheck.Checkheading)).toHaveText("Checkout");
    
   }); 

   test("Validate Return to Cart Button",async()=>{
    test.setTimeout(60000)
    OrderCheck=new Checkout(page)
    await OrderCheck.returnToCart()
    //validate cart page is loaded
    await expect(page).toHaveURL("http://localhost:10016/cart/") 
    await expect(page).toHaveTitle("Cart – ClaypotStore");  

   });

   test("Validate Order Summary Form",async()=>{
    test.setTimeout(90000)
    const cart=new CartPage(page)
    OrderCheck=new Checkout(page)
    // Go to checkout page from header
    await OrderCheck.GotoCheckout()
    await page.reload()
    //validate order summary heading
    await expect.soft (page.locator(OrderCheck.orsumhead)).toHaveText("Order summary")
    //validate order summary product name
    await expect.soft (page.locator(OrderCheck.productName)).toHaveText("Clay pot 1")
    //validate order summary product price
    await expect.soft (page.locator(OrderCheck.proPrice)).toBeVisible()
    //validate order summary product description
    await expect.soft (page.locator(OrderCheck.productDesc)).toHaveText("You can cook anything in this pot. Your every day go to product. Cooks evenly…")
    //validate order summary product logo is visible
    await expect.soft (page.locator(OrderCheck.proLogo)).toBeVisible()
    //validate order summary product quantity in the product logo
    await cart.cartVisitByURL()
    await page.reload()
    //change the quantity of product by increasing quantity
    const expectedQuantity=15
    const existingQuantity=1
    await OrderCheck.quantityIncrease(expectedQuantity,existingQuantity)
    //return to checkout form and check order summary quantity number beside product logo
    await OrderCheck.GotoCheckout()
    await page.reload()
    await quantityCheck(expectedQuantity)
    async function quantityCheck(expectedQuantity) {
        await expect.soft (page.getByText(`${expectedQuantity}`, { exact: true })).toHaveText(`${expectedQuantity}`)
    }
    //check quantity number by decreasing quantity
    await cart.cartVisitByURL()
    const existingQuantity2 = expectedQuantity;
    const expectedQuantity2 = 10;
    await OrderCheck.quantityDecrease(expectedQuantity2,existingQuantity2)
    //return to checkout form and check order summary quantity number beside product logo
    await OrderCheck.GotoCheckout()
    await page.reload()
    await quantityCheck(expectedQuantity2)
    async function quantityCheck(expectedQuantity2) {
        await expect.soft (page.getByText(`${expectedQuantity2}`, { exact: true })).toHaveText(`${expectedQuantity2}`)
        }
    });

   test("Validate Order Coupon",async()=>{
    test.setTimeout(90000)
    OrderCheck=new Checkout(page)
    //validate order summary coupon 
    const order_coupon=["fhjfs","21415","#%^@^@^@#&","SFFFFF","DDssfe12431%$E)(vvvvv"]
    for(const user of order_coupon)
    {
        await OrderCheck.Order_coup(user)
        //validate coupon authenticity
        const couptext= await page.locator(OrderCheck.errorMssg).isVisible()
        if(couptext){
        await expect.soft(page.locator(OrderCheck.errorMssg)).toHaveText(`Coupon "${user}" does not exist!`)
        } 
        //pause 2 sec
        await page.waitForTimeout(2000)
        await page.reload() 
    }
    });

    
   test("Validate Order Checkout Form",async()=>{
    test.setTimeout(60000)
    OrderCheck=new Checkout(page)
    //pause 2 sec
    await page.waitForTimeout(2000)
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

   });


});