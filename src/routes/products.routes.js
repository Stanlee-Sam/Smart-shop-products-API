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
.get("/", getAllProducts)
.get("/:id", getProduct)
.post("/", createProduct)
.patch("/:id", updateProduct)
.delete("/:id", deleteProduct);


export default router;
