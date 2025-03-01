exports.Register=
class Register{

   //elements 
   constructor(page){
     this.page=page
     this.AccountLink="header[class='aligncenter wp-block-template-part'] li:nth-child(8) a:nth-child(1) span:nth-child(1)"
     this.EmailInput="//input[@id='reg_email']"
     this.RegPasswordInput="//input[@id='reg_password']"
     this.RegisterButton="button[value='Register']"
     this.logsout="//p[contains(text(),'Hello')]//a[contains(text(),'Log out')]"

   }


   //methods--visit page
   async gotoWebsite(){
     await this.page.goto("http://localhost:10016")

   }
   //Login test
   async registration(email,password){
    await this.page.locator(this.AccountLink).click()
    await this.page.locator(this.EmailInput).fill(email)
    await this.page.locator(this.RegPasswordInput).fill(password)
    await this.page.locator(this.RegisterButton).click()

   }

   async logout(){

    await this.page.locator(this.logsout).click()
  }

}




