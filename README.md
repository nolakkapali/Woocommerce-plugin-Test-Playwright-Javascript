# Claypot Store--Playwright
Claypot Store is a ecommerce website that provides clay based pots to the customers. It is basically a demo wordpress site that is integrated the woocommerce plugin, created to perform necessary automation testing using Playwright.<br> 

Visit Claypot Store:<br>

***Development and testing of Claypot Store (uses woocommerce plugin) are given below:*** 
### How Demo Wordpress Website was Developed for Testing Purpose 
<ol>
<li>

Install wordpress local from the [website]("https://localwp.com/") and create a local site named "ClaypotStore" in local app</li><li>Start the site button, login to admin section of the site and <em>Kiosko</em> theme is selected for the ecommerce site</li>
</ol>

### Integrate Woocommerce Plugin with Wordpress Themes <br>
<ol>
<li>Install woocommerce plugin</li>
<li>Add features such as login,register,product search,product display,cart,checkout,header and footer,home pages are integrated into claypot store from the woocommerce plugin</li>
<li> All the pages are customized and integrated all the necessary functionalities from woocommerce plugin before the testing phase</li>
</ol>
<em> After integrating all the functionalities, Claypot Store is ready for testing.</em>

## Test Wordpress Site with Wordpress Plugin
The claypot store is a wordpress site that uses woocommerce plugin. The online store consists of the following pages:
<ol>
<li> Login Page</li>
<li> Register Page</li>
<li> Home Page</li>
<li> Header & Footer </li>
<li> Shop Page</li>
<li> Product Display Page</li>
<li> Cart Page</li>
<li> Checkout Page</li>
</ol>

#### Test Environment:
<ul>
<li> Local WP application</li>
<li> Website URL(Localhost): http://localhost:10016/</li>
<li> Browser: Microsoft Edge </li>
<li> Code Editor: VS Code</li>
<li> Operating System: Windows 10</li>
<li> Device: Desktop, Mobile(iPhone 15 Pro Max) and Tablet(iPad gen 7) </li>
</ul>

#### Testing Steps:
<ul>
<li> Open Local WP application and start the site </li>
<li> Go to Microsoft Edge and type the URL in the address bar:<br>http://localhost:10016/</li>
<li> The site is hosted in localhost and then open playwright and start writing functional, API, end to end test scripts to test the application</li>
<li> After completeing test scripts,tests are excuted in the terminal</li>
</ul>
Multiple types of testing are performed in all the website functionalities as well as in the API functionalities.Below are the list of testings perfomed in the playwright:
<ol><br>
<b><li>Functional Testing:</b> Clay pot store homepage, login,register,cart,shop,search and product display and checkout page functionality have been tested individually.The below command is given to test a specific module<br>

`npx playwright test ***fileName*** --project=***Device option from config file*** --headed`
</li>
<b><li>API Testing:</b> Restful APIs are included here and tested throughly. Mainly three kinds of API such as</li><br>
<ol>
<li><b>Customer API:</b> Throgh this API, Customers data were viewed,created,updated and deleted through GET,POST,PUT/PATCH,DELETE http methods.</li><br>
<li><b>Order API:</b> Similar to Cutomer API but this API deals with the customer orders and these order data were viewed,created,updated and deleted through GET,POST,PUT/PATCH,DELETE http methods.</li><br>
<li><b>Product API:</b> Similar to order API but this API focuses on the Shop products data and product data were viewed,created,updated and deleted through GET,POST,PUT/PATCH,DELETE http methods.</li>
</ol>
<br>
</li>
<b><li>Smoke Testing:</b>In all the necessary functionalities are included in smoke test file and to run the specific smoke test file below command is generated in the terminal<br>

`npx playwright test ***file_name*** --project=***Device option from config file*** --headed`
</li>
<b><li>Full Regression Testing:</b>All the test script has been included in regression test suite where the test script are tagged in with regression test so by simply running the below command can enable the entire regression test <br>

`npx playwright test --grep @regression --project=***Device option from config file*** --headed`
</li>
<b><li>Compatibility Testing:</b> Desktop, Mobile(iPhone 15 Pro Max) and Tablet(iPad gen 7) are used to test the compatibility of all the devices to view the Clay pot store website.<br>
<i>Device name and browser option must be included in the playwright config file before running the test</i><br>
Below command is used to run the test file.

`npx playwright test ***fileName*** --project=***Device option from config file*** --headed`
</li>
<b><li>E2E (End to End) Testing:</b> From Login to product checkout end to end testing scenario has been covered in this testing where user login to order placement and user log out all had been done sequentially to test the website for end to end scenario.</li>
</ol>

## Woocommerce Rest API Testing:
Woocommerce Rest API is included in the Claypot Store website.To test API,first
1. Rest API needs to enabled in the Woocommerce settings option
2. Create API key and pass the consumer key as username and consumer secret as password for Basic Authorization in the wordpress admin section.
3. Username and Password were added in the playwright config file so user does not have to pass Basic auth in every test.
4. Design and execute multple tests for customer,product and order APIs of Claypot Store web application

### Sample API Requests
Rest API documentation was followed to view,add,update and delete ClaypotStore products,orders and customers information.The documentation follows:

Documentation: [Woocommerce Rest API]("https://woocommerce.github.io/woocommerce-rest-api-docs/?shell#introduction)<br>
The following table has the sample APIs that are used to perform multiple API operations.
<table>
<th>Descriptions</th>
<th>Http Methods</th>
<th>APIs</th>
<tr>
<td>View All Customers</td>
<td>GET</td>
<td>http://localhost:10016/wp-json/wc/v3/customers</td>
</tr>
<tr>
<td>Update Customer</td>
<td>PUT</td>
<td>http://localhost:10016/wp-json/wc/v3/customers/:id</td>
</tr>
<tr>
<td>Create an Order</td>
<td>POST</td>
<td>http://localhost:10016/wp-json/wc/v3/orders</td>
</tr>
<tr>
<td>Delete a Order</td>
<td>DELETE</td>
<td>http://localhost:10016/wp-json/wc/v3/orders/:orderid?force=true</td>
</tr>
<tr>
<td>View Every Product</td>
<td>GET</td>
<td>http://localhost:10016/wp-json/wc/v3/products</td>
</tr>
<tr>
<td>View a Order</td>
<td>GET</td>
<td>http://localhost:10016/wp-json/wc/v3/orders/:orderid?force=true</td>
</tr>
</table>

After all the testing, the ClayPot Store website is launched in live version.

## Allure Reporter

After completeing all the tests on playwright,third party reporter such as Allure is used to generated the test reports.
<ul>
<li><b>Step 1:</b> Installed "allure-playwright" module and allure command line</li>
<li><b>Step 2:</b> Add allure-playwright reporter with the destination folder to store allure reports in the playwright config file</li>
<li><b>Step 3:</b>Run the test using the below command: 

````npx playwright test filename.spec.js````</li>
<li><b>Step 4:</b> Generated Allure Reports:<br> 
1) Run the below command in the command line:

````npx allure-commandline generate allure-results -o allure-report --clean````

<br>
2) Open Allure Report: <br>Use the below command<br>

```` npx allure-commandline open allure-report```` 
<br>
</ul>

***Generated Allure Reports For:***
1) Each module functional test<br>
2) Smoke test<br>
3) Full regression test<br>
4) Compatibility test <br>
4) Complete end to end test

<br>
Allure Report: Open [ClaypotStore Allure Report.mhtml]("https://github.com/nolakkapali/Woocommerce-plugin-Test-Playwright-Javascript/blob/main/ClaypotStore%20Allure%20Report.mhtml")


