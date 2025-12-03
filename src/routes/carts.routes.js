import { Router } from "express";
import cartsModel from "../model/carts.model.js";

const router = Router();

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
       
    });
});

router.get("/:cartNumber", async (req, res) => {

    const cart = await cartsModel
        .findOne({ cartNumber: req.params.cartNumber })
        .populate("products.product");
    if (!cart) {
        return res.json({ message: "Carrito no encontrado" });
    }
    res.json(cart);

});

router.get("/view/:cartNumber", async (req, res) => {
  try {
    const { cartNumber } = req.params;

    const carts = await cartsModel.find().lean(); 

    const cart = await cartsModel
      .findOne({ cartNumber })
      .populate("products.product")
      .lean();

    if (!cart) {
      return res.render("carts", {
        title: "Carrito no encontrado",
        carts,
        products: [],
        showProducts: false
      });
    }

    res.render("carts", {
      title: `Carrito ${cartNumber}`,
      carts,
      products: cart.products,
      showProducts: true
    });

  } catch (error) {
    res.status(500).json({ error: "Error al mostrar carrito" });
  }
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

export default router;