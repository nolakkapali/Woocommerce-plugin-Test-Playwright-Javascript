exports.ProductPage=
class ProductPage {

//elements
constructor(page){
    this.page=page
    this.shoplink="//ul[@class='wp-block-navigation__container is-responsive items-justified-right wp-block-navigation']//span[@class='wp-block-navigation-item__label'][normalize-space()='Shop']"
    this.heading="//h1[normalize-space()='Product Shop']"
    this.product_name="//a[normalize-space()='Clay pot 1']"
    this.product_image="//img[@title='3 Size Simple Pot']"
    this.product_price="bdi:nth-child(1)"
    this.product_addCart_button="//button[@aria-label='Add to cart: “Clay pot 1”']"
    this.BreadHome="//a[contains(text(),'Home')]"
    this.Cart="//li[contains(@class,'wp-block-post post-78 product type-product status-publish has-post-thumbnail product_cat-medium-size-pots product_tag-clay product_tag-pot1 first instock taxable shipping-taxable purchasable product-type-simple')]//a[@title='View cart'][normalize-space()='View cart']"
}

//method
//visit shop
async shopVisit(){
   await this.page.locator(this.shoplink).click()
}

//button number changes
async addtocartButton(){
    await this.page.locator(this.product_addCart_button).click()
   
}

//add to cart link
async addtocartlink(){
    await this.page.locator(this.shoplink).click()
    await this.page.locator(this.product_addCart_button).click()
    await this.page.locator(this.Cart).click()
}

//visit home breadcrumb
async BreadcrumbHomeVisit(){
    await this.page.locator(this.BreadHome).click()
}















}