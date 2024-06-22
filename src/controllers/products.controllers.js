import pool from "../db.config.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.status(200).json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    if (result.rowCount === 0) {
      res.status(404).json({ success: false, message: "Product not found" });
    } else {
      res.status(200).json({ success: true, data: result.rows });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      productThumbnail,
      productTitle,
      productDescription,
      productCost,
      onOffer,
    } = req.body;

    if (
      !productThumbnail ||
      !productTitle ||
      !productDescription ||
      productCost === undefined ||
      onOffer === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const parsedProductCost = parseFloat(productCost.replace("$", ""));

    const insert = await pool.query(
      "INSERT INTO products (productThumbnail, productTitle, productDescription, productCost, onOffer) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        productThumbnail,
        productTitle,
        productDescription,
        parsedProductCost,
        onOffer === "true",
      ]
    );

    res.status(201).json({
      success: true,
      product: insert.rows[0],
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  const {
    productThumbnail,
    productTitle,
    productDescription,
    productCost,
    onOffer,
  } = req.body;
  const id = req.params.id;
  try {
    let updateProduct;
    if (productThumbnail) {
      updateProduct = await pool.query(
        "UPDATE products SET productThumbnail = $1 WHERE id = $2",
        [productThumbnail, id]
      );
    }
    if (productTitle) {
      updateProduct = await pool.query(
        "UPDATE products SET productTitle = $1 WHERE id = $2",
        [productTitle, id]
      );
    }
    if (productDescription) {
      updateProduct = await pool.query(
        "UPDATE products SET productDescription = $1 WHERE id = $2",
        [productDescription, id]
      );
    }
    if (productCost) {
      const parsedProductCost = parseFloat(productCost.replace("$", ""));
      updateProduct = await pool.query(
        "UPDATE products SET productCost = $1 WHERE id = $2",
        [parsedProductCost, id]
      );
    }
    if (onOffer !== undefined) {
      updateProduct = await pool.query(
        "UPDATE products SET onOffer = $1 WHERE id = $2",
        [onOffer === "true", id]
      );
    }
    if (updateProduct.rowCount === 1) {
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query("DELETE FROM products WHERE id = $1", [
      id,
    ]);
    if (result.rowCount === 0) {
      res
        .status(404)
        .json({ success: false, message: "Product not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
