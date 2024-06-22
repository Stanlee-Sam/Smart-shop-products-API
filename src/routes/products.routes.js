import { Router } from "express";
import pool from "../db.config.js";
const router = Router();
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";

router
  // .get("/", getAllProducts)
  // .get("/:id", getProduct)
  // .post("/", createProduct)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.status(200).json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
});

router.get("/:id", async (req, res) => {
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
});



router.post("/", async (req, res) => {
  try {
    const { productThumbnail, productTitle, productDescription, productCost, onOffer } = req.body;

    if (!productThumbnail || !productTitle || !productDescription || productCost === undefined || onOffer === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const parsedProductCost = parseFloat(productCost.replace('$', ''));
    const parsedOnOffer = onOffer === "true";

    const insert = await pool.query(
      "INSERT INTO products (productThumbnail, productTitle, productDescription, productCost, onOffer) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [productThumbnail, productTitle, productDescription, parsedProductCost, parsedOnOffer]
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
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { productThumbnail, productTitle, productDescription, productCost, onOffer } = req.body;
    
  }
})
export default router;
