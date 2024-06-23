# SMART-SHOP PRODUCTS API

This is a simple RESTful API for managing products using Node.js, Express, and PostgreSQL.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repository/products-api.git
   cd products-api

   ```

2. Install dependencies

```bash
npm install
```

3. Run the application

```bash
npm start
```

The server will start on port '3000'

## Usage

After starting the server, you can use the following endpoints to interact with the API.

### Get All Products

- Endpoint: 'GET /products'
- Description: Retrieve a single product by its ID.

### Get a single product by its ID

- Endpoint: 'DELETE /products/:id'
- Description: Delete a product by its ID.

### Create a Product
- Endpoint: 'POST /products'
- Description: Create a new product.
- Request Body:
```json
  {
  "productThumbnail": "http://dummyimage.com/211x100.png/dddddd/000000",
  "productTitle": "Strawberries Sauce",
  "productDescription": "mi sit amet lobortis sapien sapien",
  "productCost": "$9.35",
  "onOffer": "true"
}
```

###  Update a product
- Endpoint: 'PATCH /products/:id'
- Description: Update an existing product.
- Request Body: (Only include fields you want to update)

```json
{
  "productThumbnail": "http://dummyimage.com/211x100.png/dddddd/000000",
  "productTitle": "New Product Title",
  "productDescription": "New Description",
  "productCost": "$10.00",
  "onOffer": "false"
}

```

### Delete a Product
- Endpoint: 'DELETE /products/:id'
- Description: Delete a product by its ID.

## Project Structure
- controllers/products.controllers.js  : Contains the logic for handling product-related operations.
- routes/products.routes.js: Defines the API endpoints and maps them to controller functions.
- db.config.js: Configures the PostgreSQL connection using environment variables.
- index.js: The main entry point of the application, sets up the Express server and routes.
