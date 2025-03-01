exports.Search_productDisplay=
class Search_productDisplay{

   //elements of Login 
   constructor(page){
     this.page=page
     this.box="#wp-block-search__input-2"
     this.searchlink="//button[@aria-label='Search']//*[name()='svg']"
     this.searchResult="//p[normalize-space()='No products were found matching your selection.']"
     this.pro_name="//h1[normalize-space()='Clay pot 1']"
     this.pro_image="//div[@class='woocommerce-product-gallery__image']//a"
     this.pro_price="//bdi[1]"
     this.pro_desc="//p[@class='wp-block-post-excerpt__excerpt']"
     this.desc_tab="//a[normalize-space()='Description']"
     this.add_info="//a[normalize-space()='Additional information']"
     this.review="a[role='tab'][href='#tab-reviews']"
     this.add_cart="//button[normalize-space()='Add to cart']"
     this.showMssg="//div[@class='wc-block-components-notice-banner__content']"
     this.mssg_cart="//a[normalize-space()='View cart']"
     this.rev_rating=".star"
     this.rev_write="#comment"
     this.rev_submit="//input[@id='submit']"
     this.comment="//ol[@class='commentlist']"
   }


   //methods--visit Account page
   async gotoMyAccountPage(){
     await this.page.goto("http://localhost:10016/my-account/")

   }

   //product search 
    async searching(productName){
    await this.page.locator(this.box).fill(productName)
    await this.page.locator(this.searchlink).click() 

  }
   
  //click description tab
    async description(){
    await this.page.locator(this.desc_tab).click() 
  }

  //click additional information
  async additionalInfo(){
    await this.page.locator(this.add_info).click() 
  }

  //click reviews
  async reviews(rating,text,productName){
    await this.page.locator(this.review).click()
    await this.page.locator(`${this.rev_rating}-${rating}`).click()
    await this.page.locator(this.rev_write).fill(`${productName}${text}`)
    await this.page.locator(this.rev_submit).click()

  }


   //product display page-- add to cart
   async addTocart(){
   await this.page.locator(this.add_cart).click()
   
   } 
   }




   






