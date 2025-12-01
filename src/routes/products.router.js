import { Router } from "express";
import productsModel from "../model/products.model.js";

const router = Router();

// Obtener todos los productos
router.get("/", async (req, res) => {
  const response = await productsModel.find().lean();
  res.render("home", {
    title: "Productos almacenados",
    products: response
  });
});

// Crear un nuevo producto desde postman
router.post("/", async (req, res) => {
  const { title, price, description, stock, category, available } = req.body;
  const newProducts = await productsModel.create({
    title,
    price,
    description,
    stock,
    category,
    available,
  });
  res.status(201).json({ status: "ok", payload: newProducts });
});

export default router;