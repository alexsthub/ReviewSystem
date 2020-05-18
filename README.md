# ReviewSystem

The main purpose of this project was to further familiarize myself with typescript, express, and unit tests to build a simple product review CRUD server. Users are allowed to view and add products and reviews. I was mainly focusing on the backend so I added a extremely simple client to view these products and reviews with authentication carried by Firebase. <br/>
<br/>
To run the unit tests for the server, cd into the tests directory and run: `bash test.sh`. This will spin up a new mysql docker container to perform tests on. The container needs about 15 seconds to start up so there is some wait time to run the tests. <br/>
<br/>
To start the server, run: `npm start` from the home directory. If you made any changes, make sure to run `tsc` to compile the typescript into javascript before running the start command. To start the client, cd into the client directory and run: `npm start`.<br/>
<br/>
Endpoints are:

- GET /company => Get all companies
- POST /company => Add a company
- DELETE /company/:companyID => Delete a company
- PATCH /company/:companyID => Edit a company
- GET /products => Get all products
- GET /products/productID => Get a specific product
- GET "/products/company/:companyID" => Get company products
- POST "/products" => Add a product
- DELETE "/products/:productID => Delete a product
- PATCH "/products/:productID => Edit a product
- GET "/reviews" => Get all reviews
- GET "/reviews/:id => Get reviews by productID or reviewID. Type query parameter
- POST "/reviews" => Add a review
- DELETE "/reviews/:reviewID" => Delete a review
- PATCH "reviews/:reviewID" => Edit a review
