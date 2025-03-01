import {test,expect} from '@playwright/test'
import { HomePage } from '../../ClaypotstorePages/HomePage'
import { Search_productDisplay } from '../../ClaypotstorePages/Search_ProductDisplay'
import { Login } from '../../ClaypotstorePages/Login'

const validSearchData=[{name:"Clay pot 1",star:"5",message:"The product I have used is durable and vivrant"},
        {name:"clay",star:"4",message:"Food cooked in it tastes really amazing"},
        {name:"pot",star:"4",message:"Fanatabulastic"},
        {name:"1",star:"5",message:"wooowwwzaaaaaaaaaa"},
        {name:"Clay pot",star:"5",message:"Touched my mind and soul"},
        {name:"clay pot",star:"5",message:"The pot size makes it very easier to use and not so heavy which works for me!"},
        {name:"clay pot 1",star:"4",message:"Clay Pots are always really good to make tasty dishes!!"},
        {name:"CLAY POT",star:"3",message:"Never judge by looks! cuz this product is gold!"}]
        
const invalidSearchData = ["claypot1","Claypot1","claypot","CLAYPOT1","PotofClay","Round pot","DGHSH","SFDGcf","41EFgcFDSG736#@%$@"];

test.describe("search_productDisplay",()=>{
   
    let search
    let product_display
    let page

    test.beforeEach(`UserLogin`, async({browser})=>{
       test.setTimeout(60000)
       page=await browser.newPage();//new page created
       const homepage=new HomePage(page)
       const Userlogin=new Login(page) 
       //login
       await Userlogin.gotoMyAccountPage()
       await Userlogin.logging("nolak123","nolak123")
       //verify login
       await expect(page.locator(Userlogin.logoutLink)).toBeVisible()
       //go to homepage
       await homepage.gotoHomePage()
       //verify homepage
       //check HomePage URL 
       await expect(page).toHaveURL("http://localhost:10016/")
       //check HomePage Title
       await expect(page).toHaveTitle("ClaypotStore");


    })

    test.afterEach(async()=>{
        const Userlogin=new Login(page) 
        //logout
        await page.locator(Userlogin.myaccLink).click()
        await Userlogin.logout()
        //page closes
        await page.close()
    })


    // //validate valid product data search and product display page
    for(const user of validSearchData) {
    test(`verify searching ${user.name} product`, async()=>{
        test.setTimeout(60000)
        search =new Search_productDisplay (page)
        await search.searching(user.name)
        //pause-2sec
        await page.waitForTimeout(2000)
        //product display page will show after valid data search
        await expect(page).toHaveURL("http://localhost:10016/product/clay-pot-1/")

        //validate product display page 
        //validate product name is visible and correct
        await expect.soft (page.locator(search.pro_name)).toBeVisible()
        await expect.soft(page.locator(search.pro_name)).toHaveText("Clay pot 1")

        //validate product price is visible and correct
        await expect.soft (page.locator(search.pro_price)).toBeVisible()
        await expect.soft(page.locator(search.pro_price)).toHaveText("250.00৳")

        //validate product description is visible and correct
        await expect.soft (page.locator(search.pro_desc)).toBeVisible()
        await expect.soft(page.locator(search.pro_desc)).toHaveText("You can cook anything in this pot. Your every day go to product. Cooks evenly and helps maintain your health. ")

        //validate product image is visible and correct
        await expect.soft (page.locator(search.pro_image)).toBeVisible()

        //validate product description,additional info and review tab is visible and working
        await search.description()
        await search.additionalInfo()
        await search.reviews(user.star,user.message,user.name)
        //reviews are visible
        await expect.soft(page.locator(search.comment)).toBeVisible()

        //validate add to cart is visible and working
        await expect.soft (page.locator(search.add_cart)).toBeVisible()
        await search.addTocart()
        const showMessage= await page.locator(search.showMssg).isVisible()
        //pause-2sec
        await page.waitForTimeout(2000)
        const messageText = await page.locator(search.showMssg).innerText();
        if(showMessage){
            expect.soft(messageText).toContain("“Clay pot 1” has been added to your cart.");
            //await expect.soft(page.locator(search.showMssg)).toHaveText("Clay pot 1” has been added to your cart. ");
            await page.locator(search.mssg_cart).click()
            await expect(page).toHaveURL("http://localhost:10016/cart/")

        }
            
        //pause-2sec
        await page.waitForTimeout(2000)
 
     })
    }
    
    //validate invalid product data search
    for(const user of validSearchData) {
        test(`verify searching ${user.name}product`, async()=>{
            test.setTimeout(60000)
            search =new Search_productDisplay (page)
            await search.searching(user)
            //pause-2sec
            await page.waitForTimeout(2000)
            //search result page will show
            const searchText=await page.locator(search.searchResult).innerText()
           // await expect.soft(page.locator(search.pro_desc)).toHaveText("You can cook anything in this pot. Your every day go to product. Cooks evenly and helps maintain your health. ")
            await expect.soft (searchText).toBe("No products were found matching your selection.")

         })
        }
  
})