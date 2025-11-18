import { Router } from 'express';
import { readFile, writeFile, productsFile, cartsFile } from '../utils/utils.js';

const route = Router();

// Renderiza la vista de home con la lista de productos
route.get('/', async (req, res) => {
  try {
    const products = await readFile(productsFile);
    res.render('home', {
      title: 'Listado de productos',
      products
    });
  } catch (error) {
    console.error('Error al renderizar home:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Renderiza la vista del carrito de compras
route.get('/carts', async (req, res) => {
  try {
    const carts = await readFile(cartsFile);
    res.render('carts', {
      title: 'Carrito de compras',
      carts
    });
  } catch (error) {
    console.error('Error al renderizar carts:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Renderiza la vista de productos en /realIimeProducts
route.get('/realTimeProducts', async (req, res) => {
  try {
    const products = await readFile(productsFile);
    res.render('realTimeProducts', {
      title: 'WebSocket - Productos',
      products
    });
  } catch (error) {
    console.error('Error al renderizar home:', error);
    res.status(500).send('Error interno del servidor');
  }
});

export default route;  