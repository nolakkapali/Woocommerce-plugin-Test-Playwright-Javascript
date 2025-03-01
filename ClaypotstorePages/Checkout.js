exports.Checkout=class Checkout{
    constructor(page){
        this.page=page
        this.Checkheading="//h1[normalize-space()='Checkout']"
        this.returnCart="//a[normalize-space()='Return to Cart']"
        this.orsumhead="//p[@role='heading']"
        this.productName="//h3[normalize-space()='Clay pot 1']"
        this.proQuantity="//span[normalize-space()='3']"
        this.productDesc="div[class='wc-block-components-product-metadata__description'] p"
        this.proLogo="//img[@alt='3 pots']"
        this.proPrice="//span[@class='wc-block-formatted-money-amount wc-block-components-formatted-money-amount wc-block-components-product-price__value']"
        this.incButton="//button[contains(text(),'＋')]"
        this.decButton="//button[contains(text(),'－')]"
        this.checkoutLink="//span[normalize-space()='Checkout']"
        this.coupButton="//div[@role='button']//*[name()='svg']"
        this.enterButton="//input[@id='wc-block-components-totals-coupon__input-coupon']"
        this.applyButton="//span[normalize-space()='Apply']"
        this.errorMssg="p[id='validate-error-coupon'] span"
        this.emailCheck="//input[@id='checkbox-control-0']"
        this.directBank="//input[@id='radio-control-wc-payment-method-options-bacs']"
        this.placeOrder="//button[@type='button']"
        this.orderConfirm="//p[normalize-space()='Thank you. Your order has been received.']"
        this.checkedAdd="//input[@id='checkbox-control-1']"
    }
  
    //goto checkout page
    async GotoCheckout() {
        await this.page.getByLabel('Navigation', { exact: true }).getByRole('link', { name: 'Checkout' }).click();
        //await this.page.locator(this.checkoutLink).click()
       }
    async GotoCheckoutURL() {
     await this.page.goto("http://localhost:10016/checkout/")
    }

    async returnToCart(){
        await this.page.locator(this.returnCart).click()
    }
   
    //order summary methods
    async quantityIncrease(expected,given){

        for(let i=given+1;i<=expected;i++)
        {
        //await this.page.locator(this.incButton).click()
           await this.page.getByRole('button', { name: 'Increase quantity of Clay pot' }).click();
        }
    }
    async quantityDecrease(expected,given){

        for(let i=given-1;i>=expected;i--)
        {
            await this.page.getByRole('button', { name: 'Reduce quantity of Clay pot' }).click();    
        //await this.page.locator(this.decButton).click()
        }
    }

    //order coupon
    async Order_coup(coupon){
        await this.page.locator(this.coupButton).click()
        await this.page.locator(this.enterButton).fill(coupon)
        await this.page.locator(this.applyButton).click()
    }

}