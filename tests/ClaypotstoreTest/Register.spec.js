import {test,expect} from "@playwright/test"
import { Register } from "../../ClaypotstorePages/Register"

const validData=[{email:"rinmk33322242@gmail.com",password:"123edf%^&hGF6"},//13 charboundaryValue--password
    {email:"12SSAAAAAMM*Mcin@yahoo.com",password:"GGC+GVH@yahoo.com"}, //12 charboundaryValue--password
    {email:"vggUh12222324_vmd&7-gjddSA34@ghvwd.edu.bd",password:"hjvfv46723g!?$%^&)("}]
   

const invalidData=[{email:"hhbvvjsv$@#124@",password:"sdfredASC21"},//11 charboundaryValue--password
        {email:"ghmja.com",password:"fdrs23145^"},//10 charboundaryValue--password
        {email:"nolak.kapali@gmail.com",password:"nol12345678*8"}, // already registered email
        {email:"43135626@yahoo",password:""},
        {email:"",password:"254434567363"},
        {email:"Chhfvvh4671324763#%#@hjkj^%&$&@hb@bjbkj^%&.@comJb@",password:"57   73_84  h--b--d_14-----2"}];


test.describe("RegisterFunctionalityTest@regression", ()=>{
   let register //declare register object
   let page
//    const page = await context.newPage();
    test.beforeEach("Launch ClayPotStore", async({browser})=>{
        test.setTimeout(60000)
        page=await browser.newPage()
        /*initialize Register class in the object to invoke 
        the methods,elements in the page object class*/
        register=new Register(page);
        //visit ClayPotStore
        await register.gotoWebsite();
        //pause-3sec
        await page.waitForTimeout(2000)
        
    })
    
    test.afterEach(async()=>{
       
       await page.close()
         
    })

       for(const user of validData){
           test(`Register with ${user.email} Valid data @positive@smoke`, async()=>{
              test.setTimeout(60000)
              register=new Register(page)
              //register.gotoWebsite();
              //perform register operation
              await register.registration(user.email,user.password)
              //verify successful registration--check "hello" text block is visible to user
              const helloMssg= await page.locator("//p[contains(text(),'Hello')]").isVisible()
              if(helloMssg)
              { 
                await expect(page.locator("//p[contains(text(),'Hello')]")).toBeVisible()
                //logsout
                register.logout()
              }
              //If Registration fails
              else
              {
               console.log(`For ${user.email} valid data, Registration doesn't pass so this is a DEFECT!!`)
              }
              //pause-2sec
              await page.waitForTimeout(2000)
})
   }

       for(const user of invalidData){
           test(`Register with ${user.email}  Invalid data @negative`, async()=>{
             test.setTimeout(60000)
             register=new Register(page)
            
             //perform register operation
             await register.registration(user.email,user.password)
             //verify error message for already registered email
             const errorMessage= await page.locator("//div[@class='woocommerce-MyAccount-content']").isVisible()
             if(errorMessage){
               await expect(page.locator("//div[@class='woocommerce-MyAccount-content']")).toHaveText(` An account is already registered with ${user.email} Please log in or use a different email address.	`)
             } 
               //pause-2sec
             await page.waitForTimeout(2000)
})

   }
        
})