import {test,expect} from '@playwright/test'
import { HeaderFooter } from '../../ClaypotstorePages/HeaderFooter'
import { HomePage } from "../../ClaypotstorePages/HomePage"

test.describe("HeaderandFooter",()=>{
    let page
    let headerFooter

    test.beforeEach("User Login",async({browser})=>{
        test.setTimeout(90000)
        page=await browser.newPage();//new page created 
        const homepage=new HomePage(page)
        //go to homepage
        await homepage.gotoHomePage()
    })


    test.afterEach("Page closes",async()=>{
        await page.close()
        
       });


    test("Validate Header Logo, Title",async()=>{
        test.setTimeout(60000)
        headerFooter=new HeaderFooter(page)
        //check logo is visible
        await expect(page.locator(headerFooter.logo)).toBeVisible()
        //check title is visible
        await expect(page.locator(headerFooter.title)).toBeVisible()
        //check title is correct
        await expect(page.locator(headerFooter.title)).toHaveText("ClaypotStore")

        
       })
    test("Validate Header Links",async()=>{
        test.setTimeout(60000)
        headerFooter=new HeaderFooter(page)
        const homepage = new HomePage(page)
        //check home,facebook,instagram,youtube,shop,cart,chechkout,account, cart logo elements visible
        await expect(page.locator(headerFooter.Hhome)).toBeVisible()
        await expect(page.locator(headerFooter.Hfacebook)).toBeVisible()
        await expect(page.locator(headerFooter.Hinstagram)).toBeVisible()
        await expect(page.locator(headerFooter.Hyoutube)).toBeVisible()
        await expect(page.locator(headerFooter.shop)).toBeVisible()
        await expect(page.locator(headerFooter.Hcart)).toBeVisible()
        await expect(page.locator(headerFooter.Hcheckout)).toBeVisible()
        await expect(page.locator(headerFooter.Haccount)).toBeVisible()
        await expect(page.locator(headerFooter.cartLogo)).toBeVisible()

        //check home,facebook,instagram,youtube,shop,cart,chechkout,account elements names are correct
        await expect(page.locator(headerFooter.Hhome)).toHaveText("Home")
        await expect(page.locator(headerFooter.Hfacebook)).toHaveText("Facebook")
        await expect(page.locator(headerFooter.Hinstagram)).toHaveText("Instagram")
        await expect(page.locator(headerFooter.Hyoutube)).toHaveText("YouTube")
        await expect(page.locator(headerFooter.shop)).toHaveText("Shop")
        await expect(page.locator(headerFooter.Hcart)).toHaveText("Cart")
        await expect(page.locator(headerFooter.Hcheckout)).toHaveText("Checkout")
        await expect(page.locator(headerFooter.Haccount)).toHaveText("My account") 

        //verify all the links

         //title take user to homepage
         await page.locator(headerFooter.title).click()
         //verify Homepage--By URL
         await expect(page).toHaveURL("http://localhost:10016/")

        //goto homepage
        await page.locator(headerFooter.Hhome).click()
        //verify Homepage--By URL
        await expect(page).toHaveURL("http://localhost:10016/")

        //goto facebook
        await page.locator(headerFooter.Hfacebook).click()
        //verify facebook-By URL
        await expect(page).toHaveURL("https://www.facebook.com/")
        await homepage.gotoHomePage()

        //goto instagram
        await page.locator(headerFooter.Hinstagram).click()
        //verify instagram--By URL
        await expect(page).toHaveURL("https://www.instagram.com/")
        await homepage.gotoHomePage()

        //goto youtube
        await page.locator(headerFooter.Hyoutube).click()
        //verify youtube--By URL
        await expect(page).toHaveURL("https://www.youtube.com/")
        await homepage.gotoHomePage()
  
        //goto shop
        await page.locator(headerFooter.shop).click()
        //verify shop--By URL
        await expect(page).toHaveURL("http://localhost:10016/shop/")
        await homepage.gotoHomePage()

        //goto cart
        await page.locator(headerFooter.Hcart).click()
        //verify cart--By URL
        await expect(page).toHaveURL("http://localhost:10016/cart/")
        await homepage.gotoHomePage()

        //goto account
        await page.locator(headerFooter.Haccount).click()
        //verify account--By URL
        await expect(page).toHaveURL("http://localhost:10016/my-account/")
        await homepage.gotoHomePage()
       })

    test("Validate Footer Visible Texts",async()=>{
        test.setTimeout(60000)
        headerFooter=new HeaderFooter(page)
        //check title is visible
        await expect(page.locator(headerFooter.Ftitle)).toBeVisible()
        //check title is correct
        await expect(page.locator(headerFooter.Ftitle)).toHaveText("ClaypotStore")
        // footer title take user to homepage
        await page.locator(headerFooter.Ftitle).click()
        //verify Homepage--By URL
        await expect(page).toHaveURL("http://localhost:10016/")
        
       })     

});