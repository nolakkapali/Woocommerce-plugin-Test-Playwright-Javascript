import {test,expect} from "@playwright/test";
import { HomePage } from "../../ClaypotstorePages/HomePage";
import { Login } from "../../ClaypotstorePages/Login";

test.describe("HomePageTest@regression", ()=>{
    let homepage
    let page

    test.beforeEach("Page Creation", async({browser})=>{
        test.setTimeout(60000)
        page=await browser.newPage();//new page created
        homepage= new HomePage(page)
        await homepage.gotoHomePage()
    })   
    
    test.afterEach("Page Closes",async()=>{
     await page.close() //page closes 

    })


    test("Verify HomePage URL and Title", async()=>{
        test.setTimeout(60000)    
        homepage= new HomePage(page)
       //check HomePage URL 
       await expect(page).toHaveURL("http://localhost:10016/")
       //check HomePage Title
       await expect(page).toHaveTitle("ClaypotStore");
 
})


    test("Verify HomePage Images", async()=>{
        test.setTimeout(60000)    
        homepage= new HomePage(page)    
        //check Homepage Images are visible
        await expect.soft(page.locator(homepage.mainImage)).toBeVisible()
        await expect.soft(page.locator(homepage.image_1)).toBeVisible()
        await expect.soft(page.locator(homepage.image_2)).toBeVisible()

    
})
    
    //check Home page Texts
    test("Verify HomePage Texts", async()=>{
        test.setTimeout(60000)
        homepage= new HomePage(page)    
        //check Homepage Texts are visible
        await expect.soft(page.locator(homepage.MainHeading)).toHaveText("Clay pots")
        await expect.soft(page.locator(homepage.MainSubheading)).toHaveText("We take pride in the quality of our products and use only the highest quality of clay to ensure that each pot gives you uniform cooking. Browse our collection and discover the perfect elegance crafted from clay to add a touch of sophistication to your home.")
        await expect.soft(page.locator(homepage.Heading_1)).toHaveText("Made with warmth of heart")
        await expect.soft(page.locator(homepage.Subheading_1)).toHaveText("Adding a touch of love in the pots that are made from original clay, handpicked by the potters, gracefully carved, and given beautiful shapes according to your taste.")
        await expect.soft(page.locator(homepage.Heading_2)).toHaveText("Quality Materials")
        await expect.soft(page.locator(homepage.Subheading_2)).toHaveText("We use only the highest-quality materials in our pots, ensuring that they look great and last for years to come.")
        await expect.soft(page.locator(homepage.Heading_3)).toHaveText("Unique design")
        await expect.soft(page.locator(homepage.Subheading_3)).toHaveText("From bold prints to intricate details, our pots are a perfect combination of style and function.")
    })

    //check "Shop Them Now" button when user is not logged in
    test("Shop Button Test witout Login", async()=>{
      test.setTimeout(60000)
      homepage=new HomePage(page)
      //check shop button without logging in
      await homepage.shopButton()
      //the result shows user need to login text
      await expect.soft(page.locator(homepage.WithoutLogShopBtn)).toHaveText("User Have to Login First!")
    
    })

    //check "Shop Them Now" button when user is logged in
    test("Shop Button Test with Login", async()=>{
        test.setTimeout(60000)
        homepage=new HomePage(page)
        const Userlogin=new Login(page)
        //go to account page
        await Userlogin.gotoMyAccountPage()
        //complete login
        await Userlogin.logging("nolak123","nolak123")
        //check shop button with login
        await homepage.gotoHomePage()
        await homepage.shopButton()
        //result shows the cart page
        await expect.soft(page.locator(homepage.WithLogShopBtn)).toHaveText("Product Shop")
        
  
      })
    
    
})

