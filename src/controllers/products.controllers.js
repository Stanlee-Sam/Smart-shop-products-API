export const getAllProducts = (req, res) => {
  res.send("Getting all products");
};
export const getProduct = (req, res) => {
  res.send("Getting a product  " + req.params.id);
};

export const createProduct = (req, res) => {
  res.send("Creating a new product");
};

export const updateProduct = (req, res) => {
  res.send("Update a product ");
};
export const deleteProduct = (req, res) => {
  res.send("Delete product");
};
