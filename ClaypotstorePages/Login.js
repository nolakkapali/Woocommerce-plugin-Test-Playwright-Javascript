exports.Login=
class Login{

   //elements of Login 
   constructor(page){
     this.page=page
     this.myaccLink="//ul[@class='wp-block-navigation__container is-responsive items-justified-right wp-block-navigation']//span[@class='wp-block-navigation-item__label'][normalize-space()='My account']"
     this.usernameInput="#username"
     this.passwordInput="#password"
     this.loginButton="//button[@name='login']"
     this.logoutLink="//li[@class='woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--customer-logout']//a[contains(text(),'Log out')]"
     this.c="ul[class='wp-block-navigation__container is-responsive items-justified-right wp-block-navigation'] li[class=' wp-block-navigation-item current-menu-item wp-block-navigation-link'] span[class='wp-block-navigation-item__label']"

   }


   //methods--visit Account page
   async gotoMyAccountPage(){
     await this.page.goto("http://localhost:10016/my-account/")

   }

   async gotoAccountByLink(){
    await this.page.locator(this.myaccLink).click()
   }

   //Loging test
    async logging(userID,password){
    await this.page.locator(this.usernameInput).fill(userID)
    await this.page.locator(this.passwordInput).fill(password)
    await this.page.locator(this.loginButton).click() 
   }

    async cartVisit(){

    await this.page.locator(this.c).click()
  }




   async logout(){

    await this.page.locator(this.logoutLink).click()
  }

   

}




