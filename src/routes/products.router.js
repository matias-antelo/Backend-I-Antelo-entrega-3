import { Router } from "express";
import productsModel from "../model/products.model.js";

const router = Router();

//ruta para ver productos con paginacion y filtros en handlebars
router.get("/", async (req, res) => {

  let { limit, page, sort, query } = req.query;

  limit = parseInt(limit) || 10;
  page = parseInt(page) || 1;
  const filter = {};
  if (query) {
    filter.category = query;
  }
  const sortOption = {};
  if (sort === "asc") sortOption.price = 1;
  if (sort === "desc") sortOption.price = -1;

  const result = await productsModel.paginate(filter, {
    limit,
    page,
    sort: sortOption,
    lean: true
  });

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const pages = [];
  for (let i = 1; i <= result.totalPages; i++) {
    pages.push({
      number: i,
      active: i === result.page,
      link: `${baseUrl}/?page=${i}&limit=${limit}&sort=${sort || ""}&query=${query || ""}`
    });
  }

  return res.render("home", {
    title: "Productos almacenados",
    products: result.docs,
    currentQuery: query || "",
    currentLimit: limit,
    currentSort: sort || "",
    pages,
    currentPage: result.page,
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