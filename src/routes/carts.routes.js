import { Router } from "express";
import cartsModel from "../model/carts.model.js";

const router = Router();

router.get("/", async (req, res) => {
    res.render("carts", {
        title: "Listado de carritos",
    });
});

router.get("/:cid", async (req, res) => {
    try {
        const cart = await cartsModel.findById(req.params.cid)
            .populate("products.product")   // ❗ importante para más adelante
            .lean();

        if (!cart) {
            return res.status(404).send("Carrito no encontrado");
        }

        res.render("cartsId", {
            title: "Carrito seleccionado",
            cart,
            showProducts: true
        });

    } catch (error) {
        res.status(500).send("Error al obtener el carrito");
    }
});

export default router;