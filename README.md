<img src="src/public/foto/CODER_CURSO.png" alt="Texto alternativo" width="300"/>

---

<h1>🧩 Proyecto Backend I - Entrega 3</h1>

Este proyecto implementa un servidor Node.js con Express que gestiona productos y carritos de compra, utilizando MongoDB para asegurar la persistencia de la información y la implementación de handlebars para la interfaz con el usuario.

<h2>⚙️ Estructura del proyecto</h2>

```
📦 Backend-I-Antelo
├── 📁 src/
│    ├── 📁 model/
│    │   ├── 📄 carts.model.js
│    │   └── 📄 products.model.js
│    │
│    ├── 📁 public/
│    │   ├── 📁 foto/
│    │   │   └── 🖼️ CODER_CURSO.png
│    │   ├── 📄 home.button.js
│    │
│    ├── 📁 routes/
│    │   ├── 📄 carts.routes.js
│    │   └── 📄 views.router.js
│    │
│    ├── 📁 views/
│    │   ├── 📁 layouts/
│    │   │   ├── 📄 main.handlebars
│    │   │   └── 📄 style.css
│    │   ├── 📄 carts.handlebars
│    │   ├── 📄 home.handlebars
│    │   └── 📄 homeProductId.handlebars
│    │
│    └── 📄 app.js
│
├── 📄 .gitignore
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 README.md
```

<h2>📄 Documentación de Métodos</h2>

<h3>🌍 APP</h3>

<h4>app.js</h4>
<p>
- <strong>//conexion con mongoose</strong>: se creo la conexcion a la base de datos de mongoDB.<br>
- <strong>//conexion con handlebars</strong>: se encuentran lo necesario para poder utilizar handlebars y la hoja de estilo CSS.<br>
- <strong>// Rutas</strong>: rutas generadas para productos y carritos.
</p>

<h3>📄 MODEL</h3>
<h4>carts.model.js</h4>
<p>se crea la coleccion y schema que se va a almacenar en mongoDB </p>    
<h4>products.model.js</h4>
<p>se crea la coleccion y schema que se va a almacenar en mongoDB</p>

<h3>🖥️ PUBLIC </h3>

<h4>home.button.js</h4>
<p>
<strong>Maneja interacciones en la página de inicio (agregar/eliminar del carrito).</strong><br>
- <strong>btn-agregar</strong>: Redirige el navegador a la ruta de detalle del producto: GET /api/products/:id para mostrar el producto elegido producto.<br>
- <strong>btn-agregar1</strong>: se utiliza para agregar el producto al carrito elegido. El carrito se ingresa con un dialogo de sweet alert.<br>
- <strong>Abrir carrito</strong>: Se utiliza para hacer submit del carrito seleccionado desde el formulario.<br>
- <strong>btn-delete-all</strong>: Se utiliza para borrar todos los productos del carrito.<br>
- <strong>btn-delete</strong>: Se utiliza para borrar el producto elegido del carrito.<br>
- <strong>btn-update</strong>: se toma un valor desde el input con este boton y actualiza la cantidad del producto.<br>
- <strong>btn-agregar-producto:</strong>: toma desde el desplegable el producto y la cantidad desde un input para crear o actualizar el producto del carrito.eriza página de inicio con listado de productos desde products.json.<br>

<h3>🔄 ROUTES</h3>

<h4>products.router.js</h4>
<p>
<strong>GET /</strong>: Renderiza la vista home con lista de productos paginados. Acepta query params: `limit` (productos por página, default 10), `page` (página actual, default 1), `sort` (asc/desc por precio) y `query` (filtrar por categoría). Construye dinámicamente los enlaces de paginación.<br>
<strong>POST /api/products</strong>: Crea un nuevo producto en MongoDB. Recibe `title`, `price`, `category` (obligatorios) y `description`, `stock`, `available` (opcionales) en el body. Retorna JSON con status "ok" y el producto creado.<br>
<strong>GET /api/products/:pid</strong>: Renderiza la vista homeProductId mostrando los detalles completos de un producto específico buscado por su ID en MongoDB.
</p>

<h4>carts.routes.js</h4>
<p>
<strong>Gestiona las operaciones del carrito de compras con persistencia en MongoDB.</strong><br>
<strong>GET /</strong>: Renderiza el carrito por defecto (cartNumber 1) mostrando todos los productos asociados con populate de referencias.<br>
<strong>GET /api/:cartNumber</strong>: Verifica la existencia de un carrito específico (retorna 200 si existe, 404 si no).<br>
<strong>GET /:cartNumber</strong>: Renderiza la vista del carrito especificado por número, mostrando sus productos.<br>
<strong>POST /create</strong>: Crea un nuevo carrito con un número identificador único en MongoDB.<br>
<strong>POST /:cartNumber/product/:pid</strong>: Agrega un producto al carrito; si ya existe, incrementa su cantidad en 1.<br>
<strong>DELETE /:cartNumber/products/:pid</strong>: Elimina un producto específico del carrito usando operador $pull.<br>
<strong>DELETE /:cartNumber</strong>: Vacía todos los productos del carrito (limpia el array de products).<br>
<strong>PUT /api/:cid/products/:pid</strong>: Actualiza la cantidad de un producto específico en el carrito.<br>
<strong>PUT /:cartNumber/product</strong>: Agrega o actualiza un producto en el carrito; si existe actualiza cantidad, si no lo crea.
</p>


<h3>👁️ VIEWS </h3>

<h4>layouts/main.handlebars</h4>
<p>
<strong>Layout principal que envuelve todas las páginas de la aplicación.</strong><br>
Define la estructura HTML base (DOCTYPE, meta tags, title dinámico). En el head carga el CSS desde `/styles/style.css` y la librería SweetAlert2 desde CDN. Incluye un header con el título "CARRITO DE COMPRAS PARA PRODUCTOS" y una barra de navegación con enlaces a "Productos" (`/`) y "Carrito" (`/carts`). El placeholder `{{{body}}}` se reemplaza con el contenido específico de cada página (home.handlebars, carts.handlebars, etc.). Finaliza con un footer con información legal y derechos de autor.
</p>

<h4>home.handlebars</h4>
<p>
<strong>Página principal que muestra el listado de productos con filtrado y paginación.</strong><br>
Incluye un formulario con tres filtros: <strong>query</strong> (buscar por categoría), <strong>sort</strong> (ordenar por precio asc/desc) y <strong>limit</strong> (cantidad de productos por página: 5, 10 o 20). Itera sobre el array `products` renderizando cada producto en una tarjeta con título, precio, disponibilidad y un botón "Mostrar producto" (clase `btn-agregar`) que redirige a `GET /api/products/:id` para ver detalles. Incluye paginación dinámicamente generada con enlaces que preservan los filtros actuales.
</p>

<h4>carts.handlebars</h4>
<p>
<strong>Página de gestión del carrito de compras con selector de carritos y lista de productos.</strong><br>
Contiene un formulario selector de carritos que itera sobre el array `carts` y permite elegir cuál carrito visualizar mediante un dropdown. Incluye un panel para agregar productos directamente: selecciona un producto del dropdown (iterando `productsList`), especifica la cantidad y hace submit con el botón `btn-agregar-producto`. Renderiza cada producto en el carrito en una tarjeta mostrando: título, precio, categoría, descripción, cantidad actual e input para modificarla. Cada producto tiene dos botones: `btn-update` para actualizar la cantidad y `btn-delete` para eliminar del carrito. Al final incluye un botón `btn-delete-all` para vaciar completamente el carrito.
</p>

<h4>homeProductId.handlebars</h4>
<p>
<strong>Página de detalle de un producto específico con opción para agregar al carrito.</strong><br>
Renderiza la información completa de un producto buscado por su ID. Muestra una tarjeta con imagen, título, precio, categoría, stock y descripción. Incluye un indicador visual de disponibilidad: texto verde "Disponible" si el campo `available` es verdadero, o texto rojo "Sin stock" si es falso. Contiene un botón `btn-agregar1` con el atributo `data-id` para agregar el producto al carrito mediante un diálogo de SweetAlert. Carga el script `home.button.js` para manejar la interacción del botón.
</p>

---

📚 Autor

Matías Antelo

Proyecto desarrollado para la entrega de Backend I (Coderhouse).