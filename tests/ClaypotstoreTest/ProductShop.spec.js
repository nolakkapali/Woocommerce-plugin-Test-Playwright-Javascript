import {test,expect} from "@playwright/test";
import { ProductPage } from "../../ClaypotstorePages/ProductShop";
import { Login } from "../../ClaypotstorePages/Login";

test.describe("ProductPageTest@regression", ()=>{
    let product
    let page
    let Userlogin

    test.beforeAll("Page Creation", async({browser})=>{
        test.setTimeout(60000)
        page=await browser.newPage();//new page created
        product= new ProductPage(page)
        Userlogin=new Login(page)
        //go to account page
        await Userlogin.gotoMyAccountPage()
        //complete login
        await Userlogin.logging("nolak123","nolak123")
        //goto shop
        await product.shopVisit()
        //pause-1sec
        await page.waitForTimeout(1000)

    }) //npx playwright test ProductShop.spec.js --project=edge --headed
       
    test.afterAll("Page Closes",async()=>{
     
        //page closes
        await page.close() 

    })


    test("Verify ProductPage URL and Title", async()=>{
        test.setTimeout(60000)    
        product= new ProductPage(page)
       //check ProductPage URL 
       await expect(page).toHaveURL("http://localhost:10016/shop/")
       //check ProductPage Title
       await expect(page).toHaveTitle("Product Shop – ClaypotStore");
       //pause-1sec
       await page.waitForTimeout(1000)
 
})

//npx playwright test ProductShop.spec.js --project=edge --headed
    test("Verify Product Page Heading and Product Name,Image,Price,Add to Cart button", async()=>{
        test.setTimeout(60000)    
        product= new ProductPage(page)    
        //check Product Page Heading is visible and correct
        await expect.soft(page.locator(product.heading)).toBeVisible()
        await expect.soft(page.locator(product.heading)).toHaveText("Product Shop")
        //check Product Name is  visible and correct
        await expect.soft(page.locator(product.product_name)).toBeVisible()
        await expect.soft(page.locator(product.product_name)).toHaveText("Clay pot 1")
        //check Product Images is visible and correct
        await expect.soft(page.locator(product.product_image)).toBeVisible()
        //check Product Add to Cart Button is visible and Button number is changing
        await expect.soft(page.locator(product.product_addCart_button)).toBeVisible()
        await product.addtocartButton()
        //pause-1sec
        await page.waitForTimeout(1000)
    
})
    
    //check Product Page Breadcrumb links are working
    test("Verify Breadcrumb Links of Product Page", async()=>{
        test.setTimeout(60000)
        product= new ProductPage(page)    
        //check breadcrumb links are working
        await expect.soft(page.locator(product.BreadHome)).toHaveText("Home")
        await product.BreadcrumbHomeVisit()
        await expect.soft(page).toHaveURL("http://localhost:10016/")
        //pause-1sec
        await page.waitForTimeout(1000)
                
})

})
