import express from 'express'
import productsRoute from './routes/products.router.js';
import cartsRoute from './routes/carts.routes.js';
import path from 'node:path';
import Handlebars from 'express-handlebars';
import mongoose from 'mongoose';

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//conexion con mongoose
mongoose.connect("mongodb+srv://anteloma87:Anteloma23%23@carrito-compras-cluster.6u5aaig.mongodb.net/Backend-I")
.then(() => {console.log("Conectado a BBDD")})
.catch(error => {console.error("Error al conectar a la BBDD", error)});

//conexion con handlebars
const hbs = Handlebars.create({helpers: {eq: (a, b) => a == b}});
app.engine("handlebars", hbs.engine);
app.set('views', path.join(process.cwd(), '/src/views'))
app.set('view engine', 'handlebars');

app.use(express.static('src/public')); 
app.use('/styles', express.static(path.join(process.cwd(), 'src/views/layouts')));

// Rutas
app.use("/", productsRoute);  
app.use("/carts", cartsRoute);     


app.listen(8080, () => {console.log(`Server ON`);})






/*Se debe entregar

Además, agregar al router de carts los siguientes endpoints:
DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
DELETE api/carts/:cid deberá eliminar todos los productos del carrito

PUT api/carts/:cid deberá actualizar todos los productos del carrito con un arreglo de productos.
PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto 
por cualquier cantidad pasada desde req.body*/



