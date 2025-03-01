import {test,expect} from "@playwright/test"

 var product_id;
test ("View Every Product", async({request})=>{
    const response=await request.get("http://localhost:10016/wp-json/wc/v3/products")
    console.log(await response.json())
    expect (response.status()).toBe(200)

})

test("View Single Product", async({request})=>{
    const response=await request.get("http://localhost:10016/wp-json/wc/v3/products/78")
    console.log(await response.json())
    expect (response.status()).toBe(200)


})

test("Create a Product", async({request})=>{
    const response=await request.post("http://localhost:10016/wp-json/wc/v3/products",
     { headers:{"Content-Type":"application/json"},
        data : { 
            "name": "Aqua",
            "type": "simple",
            "regular_price": "150.55",
            "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
            "short_description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            "categories": [
              {
                "id": 34
              },
              {
                "id": 44
              }
            ]
          }
        

        })

    console.log(await response.json())
    expect (response.status()).toBe(201)
    let res=await response.json()
    product_id=res.id// store the id pf customer to to update in the next request
    console.log(product_id)
    
})



test("Update a Product", async({request})=>{
    const response=await request.put(`http://localhost:10016/wp-json/wc/v3/products/${product_id}`,{
        headers:{"Content-Type":"application/json"},
        data:{
            "regular_price": "204.00"
          }
    })
    console.log(await response.json())
    expect (response.status()).toBe(200)

})

test("Delete a Product", async({request})=>{
    const response=await request.delete(`http://localhost:10016/wp-json/wc/v3/products/${product_id}?force=true`)
    const statusCode = response.status();
    expect(statusCode === 200 || statusCode === 204).toBe(true);


})

