import { Router } from "express";
import cartsModel from "../model/carts.model.js";

const router = Router();

//muestra el carrito 1 por defecto
router.get("/", async (req, res) => {

  const carts = await cartsModel.find().lean();
  const defaultCart = await cartsModel
    .findOne({ cartNumber: 1 })
    .populate("products.product")
    .lean();

  res.render("carts", {
    title: "Carrito Nº1",
    carts,
    products: defaultCart ? defaultCart.products : [],
    cartNumber: 1
  });
});

router.get("/api/:cartNumber", async (req, res) => {
  const cart = await cartsModel.findOne({ cartNumber: req.params.cartNumber });
  if (!cart) { return res.sendStatus(404); }
  return res.sendStatus(200);
});

router.get("/:cartNumber", async (req, res) => {
  const { cartNumber } = req.params;
  const carts = await cartsModel.find().lean();

  const cart = await cartsModel
    .findOne({ cartNumber })
    .populate("products.product")
    .lean();

  res.render("carts", {
    title: `Carrito ${cartNumber}`,
    carts,
    products: cart ? cart.products : [],
    cartNumber
  });

});


router.post("/create", async (req, res) => {
  const { cid } = req.body;
  const exists = await cartsModel.findOne({ cartNumber: cid });
  const newCart = await cartsModel.create({
    cartNumber: cid,
    products: []
  });
  res.json(newCart);
});

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

router.delete("/:cartNumber/products/:pid", async (req, res) => {
  const { cartNumber, pid } = req.params;
  const cart = await cartsModel.findOne({ cartNumber });
  cart.products = cart.products.filter(p => p.product.toString() !== pid);
  await cart.save();
  res.sendStatus(200);
});

//borrar todos los productos del carrito
router.delete("/:cartNumber", async (req, res) => {
  const { cartNumber } = req.params;
  const cart = await cartsModel.findOne({ cartNumber });
  cart.products = [];
  await cart.save();
  res.sendStatus(200);
});

router.put("/api/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const cart = await cartsModel.findOne({ cartNumber: cid });
  const product = cart.products.find(p => p.product.toString() === pid);
  product.quantity = quantity;
  await cart.save();
  res.sendStatus(200);
});

export default router;