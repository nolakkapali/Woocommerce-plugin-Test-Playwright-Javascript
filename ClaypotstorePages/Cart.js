exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;
        this.cartL="//ul[@class='wp-block-navigation__container is-responsive items-justified-right wp-block-navigation']//span[@class='wp-block-navigation-item__label'][normalize-space()='Cart']"
        this.cartItems = page.locator(".wc-block-components-main.wc-block-cart__main.wp-block-woocommerce-cart-items-block"); 
        this.cartlink = "//a[@class='wc-block-components-button wp-element-button wc-block-mini-cart__footer-cart outlined']"
        this.carttitle = "//h1[normalize-space()='Cart']"
        this.productHeading = "//span[normalize-space()='Product']";
        this.total_header = "th[class='wc-block-cart-items__header-total'] span";
        this.cart_totals_header = "//h2[normalize-space()='Cart totals']";
        this.Removebutton = "button[aria-label='Remove Clay pot 1 from cart']";
        this.addcartButton="//a[@aria-label='Add to cart: “Clay pot 1”']"
        this.emptycart="//h2[normalize-space()='Your cart is currently empty!']"
    }

    // Navigate to cart using header cart link
    async cartVisitByClickableLink() {
        await this.page.getByLabel('Navigation', { exact: true }).getByRole('link', { name: 'Cart' }).click();

    }

    // Navigate to cart using direct URL
    async cartVisitByURL() {
        await this.page.goto("http://localhost:10016/cart/");
    }

    //product add
    async productAdd() {
        await this.page.locator(this.addcartButton).click()
    }


    // Locators for individual cart items
    productName(index) {
        return this.cartItems.nth(index).locator(".wc-block-components-product-name");
    }

    productDescription(index) {
        return this.cartItems.nth(index).locator(".wc-block-components-product-metadata");
    }

    productImage(index) {
        return this.cartItems.nth(index).locator(".wc-block-cart-item__image");
    }

    productPrice(index) {
        return this.cartItems.nth(index).locator(".wc-block-cart-item__prices");
    }

    productLink(index) {
        return this.cartItems.nth(index).locator(".wc-block-components-product-name");
    }

    removeButton(index) {
        return this.cartItems.nth(index).locator(".wc-block-cart-item__remove-link");
    }

    async removeProduct(index) {
        await this.removeButton(index).click();
    }

    async openProductPage(index) {
        await this.productLink(index).click();
    }

    // Quantity controls
    increaseButton(index) {
        return this.cartItems.nth(index).locator(".wc-block-components-quantity-selector__button.wc-block-components-quantity-selector__button--plus"); 
    }

    decreaseButton(index) {
        return this.cartItems.nth(index).locator(".wc-block-components-quantity-selector__button.wc-block-components-quantity-selector__button--minus"); 
    }

    // Update product quantity
    async updateProductQuantity(index, action, expectedQuantity) {
        if (action === 'increase') {
            await this.increaseButton(index).click();
        } else if (action === 'decrease') {
            await this.decreaseButton(index).click();
        }
    }
};
