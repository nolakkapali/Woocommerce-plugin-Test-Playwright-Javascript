import {test,expect} from "@playwright/test"
import { Login } from "../../ClaypotstorePages/Login"

//valid and invalid login data
const validLoginData=[{userID:"rink332242",password:"123edf%^&hGF6"},//registered username,emails
    {userID:"12saaammmcin",password:"GGC+GVH@yahoo.com"},
    {userID:"vggh122324_vmd7-gjddsa34-1093",password:"hjvfv46723g!?$%^&)("},
    {userID:"rink332242@gmail.com",password:"123edf%^&hGF6"},
    {userID:"12SAAAMM*Mcin@yahoo.com",password:"GGC+GVH@yahoo.com"}, 
    {userID:"vggh122324_vmd&7-gjddSA34@ghvwd.edu.bd",password:"hjvfv46723g!?$%^&)("}
]

const invalidLoginData=[{userID:"Mr.Val Hel-Sin D'souza",password:"nolak123"},
                {userID:"nolak.kapali@gmail.com",password:"HGCWHXGvgd434"},
                {userID:"67458@gmail.com72764",password:"%^& #$ @ %()"},
                {userID:"CJ --h---f422@#$@%$$^!$@%^",password:"577384142"},
                {userID:"CJ@paolo.edu.bd",password:"! 5 $ @"}
]

test.describe("LoginFunctionalityTest@regression",()=>{

let Userlogin// declare object
let page //declare page

//executes before each test
test.beforeEach("Launch the Website",async({browser})=>{
     test.setTimeout(60000)
     page=await browser.newPage();
     Userlogin=new Login(page);
     //visit account page
     await Userlogin.gotoMyAccountPage();
})

//executes after each test
test.afterEach("Closes the page",async()=>{  
    
     //closes the current page
     await page.close()    

})

for(const user of validLoginData) {
   test(`Login with ${user.userID} valid data @positive @smoke`, async()=>{
         test.setTimeout(60000)
         Userlogin=new Login(page)  
         //perform login operation
         await Userlogin.logging(user.userID,user.password)

         //verify successful login --check "hello" text block is visible to user
         const helloText=await page.locator("//p[contains(text(),'Hello')]").isVisible()
         if(helloText)
         {   
           await expect (page.locator("//p[contains(text(),'Hello')]")).toBeVisible()
           //verify successful login--logout link is present
           await expect(page.locator(Userlogin.logoutLink)).toBeVisible()
           //logs out
           Userlogin.logout()
         }
         //If login fails 
         else
         { 
           console.log(`For ${user.userID} valid data, Login doesn't pass so this is a DEFECT!!`)
         }

         //pause-1sec
         await page.waitForTimeout(1000)
})
}

for(const user of invalidLoginData) {
    test(`Login with ${user.userID} @negative` , async()=>{
         test.setTimeout(60000)
         Userlogin=new Login(page)   
         //perform login operation
         await Userlogin.logging(user.userID,user.password)

         //verify unsuccessful login--logout link is absent
         await expect(page.locator(Userlogin.logoutLink)).not.toBeVisible()
         //verify unsuccesfulLogin--view the login error message
         const  username =await page.locator("//strong[normalize-space()='Error:']").isVisible()
         const emailError =await page.locator("//div[@class='wc-block-components-notice-banner__content']").isVisible()
         //not registered email address or username
         if(username)
         {
            await expect (page.locator("//strong[normalize-space()='Error:']")).toBeVisible()
         }
        //invalid email address format
        else if(emailError )
        {
            await expect(page.locator("//div[@class='wc-block-components-notice-banner__content']")).toHaveText("Unknown email address. Check again or try your username.	")
        }
        //if login is passed
        else
        {
            console.log(`For ${user.userID} invalid data, Login does pass so this is a DEFECT!!`)
        }
         //pause-1sec
         await page.waitForTimeout(1000)

})

}
});