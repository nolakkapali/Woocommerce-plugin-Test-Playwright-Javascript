exports.HeaderFooter=class HeaderFooter{
    constructor(page){
        this.page=page
        this.logo="//img[@alt='small clay pot']"
        this.title="//h1[@class='has-text-align-left has-link-color wp-elements-bffd3a01b0a9f7447ca6ae80e191bad8 wp-block-site-title']//a[contains(text(),'ClaypotStore')]"
        this.Hyoutube="//ul[@class='wp-block-navigation__container is-responsive items-justified-right wp-block-navigation']//span[@class='wp-block-navigation-item__label'][normalize-space()='YouTube']"
        this.Hfacebook="//ul[@class='wp-block-navigation__container is-responsive items-justified-right wp-block-navigation']//span[@class='wp-block-navigation-item__label'][normalize-space()='Facebook']"
        this.shop="//ul[@class='wp-block-navigation__container is-responsive items-justified-right wp-block-navigation']//span[@class='wp-block-navigation-item__label'][normalize-space()='Shop']"
        this.Hinstagram="//ul[@class='wp-block-navigation__container is-responsive items-justified-right wp-block-navigation']//span[@class='wp-block-navigation-item__label'][normalize-space()='Instagram']"
        this.Hhome="//ul[@class='wp-block-navigation__container is-responsive items-justified-right wp-block-navigation']//span[@class='wp-block-navigation-item__label'][normalize-space()='Home']"
        this.Hcart="//ul[@class='wp-block-navigation__container is-responsive items-justified-right wp-block-navigation']//span[@class='wp-block-navigation-item__label'][normalize-space()='Cart']"
        this.Hcheckout="//header[@class='aligncenter wp-block-template-part']//li[7]//a[1]"
        this.Haccount="//ul[@class='wp-block-navigation__container is-responsive items-justified-right wp-block-navigation']//span[@class='wp-block-navigation-item__label'][normalize-space()='My account']"
        this.cartLogo="//span[@class='wc-block-mini-cart__quantity-badge']//*[name()='svg']" 
        this.Ftitle="//h1[@class='wp-block-site-title']//a[contains(text(),'ClaypotStore')]"
    }



}    