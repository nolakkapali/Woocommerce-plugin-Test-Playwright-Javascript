import {test,expect} from "@playwright/test"

 var order_id;
test ("View Every Orders", async({request})=>{
    const response=await request.get("http://localhost:10016/wp-json/wc/v3/orders")
    console.log(await response.json())
    expect (response.status()).toBe(200)

})

test("View Single Order", async({request})=>{
    const response=await request.get("http://localhost:10016/wp-json/wc/v3/orders/259")
    console.log(await response.json())
    expect (response.status()).toBe(200)


})

test("Create a Order", async({request})=>{
    const response=await request.post("http://localhost:10016/wp-json/wc/v3/orders",
     { headers:{"Content-Type":"application/json"},
        data : {
  "payment_method": "bacs",
  "payment_method_title": "Direct Bank Transfer",
  "set_paid": true,
  "billing": {
    "first_name": "Samaka",
    "last_name": "Doe",
    "address_1": "969 Market",
    "address_2": "",
    "city": "San Francisco",
    "state": "CA",
    "postcode": "98133",
    "country": "US",
    "email": "Samaka.doe@example.com",
    "phone": "(555) 778-5555"
  },
  "shipping": {
    "first_name": "Samaka",
    "last_name": "Doe",
    "address_1": "969 Market",
    "address_2": "",
    "city": "San Francisco",
    "state": "CA",
    "postcode": "98133",
    "country": "US"
  },
  "line_items": [
    {
      "product_id": 93,
      "quantity": 3
    },
    {
      "product_id": 22,
      "variation_id": 23,
      "quantity": 4
    }
  ],
  "shipping_lines": [
    {
      "method_id": "flat_rate",
      "method_title": "Flat Rate",
      "total": "10.00"
    }
  ]
}
        })

    console.log(await response.json())
    expect (response.status()).toBe(201)
    let res=await response.json()
    order_id=res.id// store the id pf customer to to update in the next request
    console.log(order_id)
})



test("Update a Order", async({request})=>{
    const response=await request.put(`http://localhost:10016/wp-json/wc/v3/orders/${order_id}`,{
        headers:{"Content-Type":"application/json"},
        data:{
  "line_items": [
    {
      "product_id": 93,
      "quantity": 30
    },
    {
      "product_id": 22,
      "variation_id": 23,
      "quantity": 40
    }
  ]
}
    })
    console.log(await response.json())
    expect (response.status()).toBe(200)

})

test("Delete a Order", async({request})=>{
    const response=await request.delete(`http://localhost:10016/wp-json/wc/v3/orders/${order_id}?force=true`)
    const statusCode = response.status();
    expect(statusCode === 200 || statusCode === 204).toBe(true);


})
