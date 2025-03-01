exports.HomePage=
 class HomePage{

//all elements of Home page
constructor(page){
this.page=page
this.HomeURL="http://localhost:10016/"
this.Title="ClaypotStore"
this.MainHeading="//h1[normalize-space()='Clay pots']"
this.MainSubheading="//strong[contains(text(),'We take pride in the quality of our products and u')]"
this.Heading_1="//strong[contains(text(),'Made with warmth of heart')]"
this.Subheading_1="//p[contains(text(),'Adding a touch of love in the pots that are made f')]"
this.Heading_2="//strong[normalize-space()='Quality Materials']"
this.Subheading_2="//p[contains(text(),'We use only the highest-quality materials in our p')]"
this.Heading_3="//strong[normalize-space()='Unique design']"
this.Subheading_3="//p[contains(text(),'From bold prints to intricate details, our pots ar')]"
this.mainImage=".wp-block-group.alignfull.has-primary-color.has-base-background-color.has-text-color.has-background.has-link-color.wp-elements-1f502dc6c14f50054c4553eefba5f232.has-global-padding.is-layout-constrained.wp-container-core-group-is-layout-7.wp-block-group-is-layout-constrained"
this.image_1=".wp-block-cover__image-background.wp-image-85"
this.image_2="//img[@class='wp-block-cover__image-background wp-image-93']"
this.ShopButton=".wp-block-button__link.has-text-align-left.wp-element-button"
this.WithLogShopBtn="//h1[normalize-space()='Product Shop']"
this.WithoutLogShopBtn="//h1[normalize-space()='User Have to Login First!']"
}

//methods--visit Home page
   async gotoHomePage(){
     await this.page.goto("http://localhost:10016/")

   }

//check shop button
 async shopButton(){
   await this.page.locator(this.ShopButton).click()

 } 

}