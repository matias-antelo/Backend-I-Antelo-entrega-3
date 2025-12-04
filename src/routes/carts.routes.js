import { Router } from "express";
import cartsModel from "../model/carts.model.js";
import productsModel from "../model/products.model.js";

const router = Router();

//muestra el carrito 1 por defecto
router.get("/", async (req, res) => {

  const carts = await cartsModel.find().lean();
  const productsList = await productsModel.find().lean();
  const defaultCart = await cartsModel

    .findOne({ cartNumber: 1 })
    .populate("products.product")
    .lean();

  res.render("carts", {
    title: "Carrito Nº1",
    carts,
    products: defaultCart ? defaultCart.products : [],
    cartNumber: 1,
    productsList
  });
});

//verifica si existe el carrito
router.get("/api/:cartNumber", async (req, res) => {
  const cart = await cartsModel.findOne({ cartNumber: req.params.cartNumber });
  if (!cart) { return res.sendStatus(404); }
  return res.sendStatus(200);
});

//muestra el carrito segun el numero de carrito
router.get("/:cartNumber", async (req, res) => {
  const { cartNumber } = req.params;
  const carts = await cartsModel.find().lean();
  const productsList = await productsModel.find().lean();
  const cart = await cartsModel
    .findOne({ cartNumber })
    .populate("products.product")
    .lean();

  res.render("carts", {
    title: `Carrito ${cartNumber}`,
    carts,
    products: cart ? cart.products : [],
    cartNumber,
    productsList
  });

});

//crear un nuevo carrito
router.post("/create", async (req, res) => {
  const { cid } = req.body;
  const exists = await cartsModel.findOne({ cartNumber: cid });
  const newCart = await cartsModel.create({
    cartNumber: cid,
    products: []
  });
  res.json(newCart);
});

//agregar un producto al carrito
router.post("/:cartNumber/product/:pid", async (req, res) => {
  const { cartNumber, pid } = req.params;
  const cart = await cartsModel.findOne({ cartNumber });
  const existing = cart.products.find(p => p.product.toString() === pid);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.products.push({ product: pid });
  }
  await cart.save();
  const cartPopulated = await cartsModel
    .findOne({ cartNumber })
    .populate("products.product");
  res.json({ cart: cartPopulated });
});

//borrar un producto del carrito
router.delete("/:cartNumber/products/:pid", async (req, res) => {
  const { cartNumber, pid } = req.params;
  await cartsModel.updateOne(
    { cartNumber },
    { $pull: { products: { product: pid } } }
  );
  res.sendStatus(200);
});

//borrar todos los productos del carrito
router.delete("/:cartNumber", async (req, res) => {
  const { cartNumber } = req.params;
  await cartsModel.updateOne(
    { cartNumber },
    { $set: { products: [] } }
  );
  res.sendStatus(200);
});

//actualizar las cantidades del producto en el carrito
router.put("/api/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const cart = await cartsModel.findOne({ cartNumber: cid });
  const product = cart.products.find(p => p.product.toString() === pid);
  product.quantity = quantity;
  await cart.save();
  res.sendStatus(200);
});

//Agregar un producto en un carrito
router.put('/:cartNumber/product', async (req, res) => {
  const { cartNumber } = req.params;
  const { productId, quantity } = req.body;
  const cart = await cartsModel.findOne({ cartNumber });
  const productIndex = cart.products.findIndex(
    p => p.product.toString() === productId
  );
  if (productIndex !== -1) {
    cart.products[productIndex].quantity = quantity;
  } else {
    cart.products.push({
      product: productId,
      quantity
    });
  }
  await cart.save();
  const cartPopulated = await cartsModel
    .findOne({ cartNumber })
    .populate('products.product');

  res.status(200).json({
    status: "success",
    message: "actualizado correctamente",
    cart: cartPopulated
  });
});

export default router;