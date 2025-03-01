import {test,expect} from "@playwright/test"

 var customer_id;
test ("View Every Customers", async({request})=>{
    const response=await request.get("http://localhost:10016/wp-json/wc/v3/customers")
    console.log(await response.json())
    expect (response.status()).toBe(200)

})
//npx playwright test Customer_API_Test.spec.js --project=edge
test("View Single Customer", async({request})=>{
    const response=await request.get("http://localhost:10016/wp-json/wc/v3/customers/23")
    console.log(await response.json())
    expect (response.status()).toBe(200)


})

test("Create a Customer", async({request})=>{
    const response=await request.post("http://localhost:10016/wp-json/wc/v3/customers",
     { headers:{"Content-Type":"application/json"},
        data : {"email": "dianash@gmail.com",
            "password":"Dianah123", 
            "first_name": "Kiasha",
            "last_name": "Dimsom",
            "username": "Kiasha.Dimsom",
            "billing": {
              "first_name": "Kia",
              "last_name": "Dim",
              "company": "",
              "address_1": "969 Market",
              "address_2": "",
              "city": "San Francisco",
              "state": "TX",
              "postcode": "9111233",
              "country": "USA",
              "email": "dianash@gmail.com",
              "phone": "(555) 777-6534"
            },
            "shipping": {
              "first_name": "Kia",
              "last_name": "Dim",
              "company": "",
              "address_1": "969 Market",
              "address_2": "",
              "city": "San Francisco",
              "state": "TX",
              "postcode": "9111233",
              "country": "USA"
            }
          }
        

        })

    console.log(await response.json())
    expect (response.status()).toBe(201)
    let res=await response.json()
    customer_id=res.id// store the id of customer to to update in the next request
    console.log(customer_id)
})



test("Update a Customer", async({request})=>{
    const response=await request.put(`http://localhost:10016/wp-json/wc/v3/customers/${customer_id}`,{
        headers:{"Content-Type":"application/json"},
        data:{
            "first_name": "Nimana",
            "billing": {
              "first_name": "Nimana"
            },
            "shipping": {
              "first_name": "Nimana"
            }
          }
    })
    console.log(await response.json())
    expect (response.status()).toBe(200)

test("Delete a Customer", async({request})=>{
    const response=await request.delete(`http://localhost:10016/wp-json/wc/v3/customers/${customer_id}?force=true`)
    const statusCode = response.status();
    expect(statusCode === 200 || statusCode === 204).toBe(true);


})


})
