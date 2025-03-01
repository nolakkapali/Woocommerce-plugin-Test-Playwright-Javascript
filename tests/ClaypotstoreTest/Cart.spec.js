import {test,expect} from "@playwright/test";
import { CartPage } from "../../ClaypotstorePages/Cart"
import { ProductPage } from "../../ClaypotstorePages/ProductShop";
import { HomePage } from "../../ClaypotstorePages/HomePage"
import { Login } from "../../ClaypotstorePages/Login"
import { Search_productDisplay } from '../../ClaypotstorePages/Search_ProductDisplay'

test.describe("Cart_Page_Test@regression", ()=>{
    let cart
    let page

    test.beforeAll("Page Creation", async({browser})=>{
        test.setTimeout(90000)
        page=await browser.newPage();//new page created
        cart= new CartPage(page)
        const Userlogin=new Login(page)
        const homepage=new HomePage(page)
        //go to homepage
        await homepage.gotoHomePage()
        // Go to cart page from header
        await cart.cartVisitByClickableLink()
        const loginMessage = await page.getByText("User Have to Login First!").isVisible();
        //user login
        if (loginMessage) {
            await Userlogin.gotoMyAccountPage();
            await Userlogin.logging("nolak123", "nolak123");
        } else {
            console.log("User is already logged in!");
        }

        //load cart page
        await cart.cartVisitByClickableLink()
                

    }
    )

    test.afterAll("Close Page", async () => {
        await page.close();
    });

    test("Verify Cart Page URL and Title", async () => {
        test.setTimeout(60000)
        cart=new CartPage(page)
        await page.reload();
        await expect(page).toHaveURL("http://localhost:10016/cart/");
        // await expect(page.locator(cart.carttitle)).toBeVisible();
        await expect(page).toHaveTitle("Cart – ClaypotStore");
    });
 
    test("Adding Product to cart", async () => {
        test.setTimeout(60000)
        cart=new CartPage(page)
        //check if cart page is empty
        const ifcartEmpty = await page.locator(cart.emptycart).isVisible();
        if(ifcartEmpty)
        {
           const cartText=await page.locator(cart.emptycart).textContent()
            if(cartText==="Your cart is currently empty!"){
             await cart.productAdd()  
        }
    }
        else {
         console.log("Product is already added!")
        }

        //verify product is added along with it's corrcet name,description and price
        await expect.soft(page.locator(cart.carttitle)).toHaveText("Cart");
        await expect.soft(page.locator(cart.productHeading)).toBeVisible();
        await expect.soft(page.locator(cart.productHeading)).toHaveText("Product");
        await expect.soft(page.locator(cart.total_header)).toBeVisible();
        await expect.soft(page.locator(cart.total_header)).toHaveText("Total");
        await expect.soft(page.locator(cart.cart_totals_header)).toBeVisible();
        await expect.soft(page.locator(cart.cart_totals_header)).toHaveText("Cart totals");
    
    });

    //expected added products in cart
    const expectedProductDetails = [
        { name: "Claypot 1", description: "You can cook anything in this pot. Your every day go to product. Cooks evenly…", price: "250.00৳ ", initialQty: 1, newQty: 13 }
    ];

    test("Validate Cart Product Details, Quantity", async () => {
        test.setTimeout(60000)
        cart=new CartPage(page)
        await page.reload();
         //check if cart page is empty
         const ifcartEmpty = await page.locator(cart.emptycart).isVisible();
         if(ifcartEmpty)
         {
            const cartText=await page.locator(cart.emptycart).textContent()
             if(cartText==="Your cart is currently empty!"){
              await cart.productAdd()  
         }
     }
         else {
          console.log("Product is already added!")
         } 
        // const expectedProductDetails = [
        //     { name: "Claypot 1", description: "You can cook anything in this pot. Your every day go to product. Cooks evenly…", price: "250.00৳ ", initialQty: 1, newQty: 13 }
        // ];

        for (let i = 0; i < expectedProductDetails.length; i++) {
            const { name, description, price, initialQty, newQty } = expectedProductDetails[i]
          // Get total count of cart items
          async function getCartItemCount(){
            return await cart.cartItems.count();
        }

         // Verify multiple products in cart
         async function verifyMultipleCartItems(expectedProductDetails) {
          const count = await this.getCartItemCount();
           for (let i = 0; i < count; i++) {
            const productDetails = expectedProductDetails[i];
            await this.verifyProductDetails(i, productDetails.name, productDetails.description, productDetails.price);
        }
        }
       
        // Verify product details
         async function verifyProductDetails(index, expectedName, expectedDescription, expectedPrice) { 
        
          await expect.soft(cart.productName(index)).toHaveText(expectedName);
          await expect.soft(cart.productDescription(index)).toHaveText(expectedDescription);
          await expect.soft(cart.productPrice(index)).toHaveText(expectedPrice);
          await expect.soft(cart.productImage(index)).toBeVisible(); 
    }

            // Update quantity
            if (newQty > initialQty) {
                for (let j = initialQty; j < newQty; j++) {
                    await cart.updateProductQuantity(i, "increase", j + 1);
                }
            } else if (newQty < initialQty) {
                for (let j = initialQty; j > newQty; j--) {
                    await cart.updateProductQuantity(i, "decrease", j - 1);
                }
            }
        }
       
    });

    test("Visit Product Display from Cart",async()=>{
        test.setTimeout(60000)
        cart=new CartPage(page)
         //check if cart page is empty
         const ifcartEmpty = await page.locator(cart.emptycart).isVisible();
         if(ifcartEmpty)
         {
            const cartText=await page.locator(cart.emptycart).textContent()
             if(cartText==="Your cart is currently empty!"){
              await cart.productAdd()  
         }
        }
         else {
          console.log("Product is already added!")
         }
 
        for(let i=0;i<expectedProductDetails.length; i++) {
        await cart.openProductPage(i);
        //verify product display page
        await expect(page).toHaveURL("http://localhost:10016/product/clay-pot-1/")
        await cart.cartVisitByClickableLink()
        await page.reload();
        }
          
    });

    test("Remove Product from Cart",async()=>{
        test.setTimeout(60000)
        cart=new CartPage(page)
         //check if cart page is empty
         const ifcartEmpty = await page.locator(cart.emptycart).isVisible();
         if(ifcartEmpty)
         {
            const cartText=await page.locator(cart.emptycart).textContent()
             if(cartText==="Your cart is currently empty!"){
              await cart.productAdd()  
         }
         }
         else {
          console.log("Product is already added!")
         }
 
        for(let i=0;i<expectedProductDetails.length; i++) {
        await cart.removeProduct(i);
        //verify product removal--message will be shown in cart page
        await expect.soft(page.locator(cart.emptycart)).toBeVisible();
        await expect.soft(page.locator(cart.emptycart)).toHaveText("Your cart is currently empty!");
        await cart.cartVisitByClickableLink()
        await page.reload();
    
        }
    });
          
});
