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
<strong>Maneja interacciones en la página de products y carts.</strong><br>
- <strong>btn-agregar</strong>: Redirige el navegador a la ruta de detalle del producto: GET /api/products/:id para mostrar el producto elegido producto.<br>
- <strong>btn-agregar1</strong>: se utiliza para agregar el producto al carrito elegido. El carrito se ingresa con un dialogo de sweet alert.<br>
- <strong>Abrir carrito</strong>: Se utiliza para hacer submit del carrito seleccionado desde el formulario.<br>
- <strong>btn-delete-all</strong>: Se utiliza para borrar todos los productos del carrito.<br>
- <strong>Abrir carrito</strong>: Se utiliza para hacer submit del carrito seleccionado desde el formulario.<br>
- <strong>btn-delete</strong>: Se utiliza para borrar el producto elegido del carrito.<br>
- <strong>Abrir carrito</strong>: Se utiliza para hacer submit del carrito seleccionado desde el formulario.<br>
- <strong>btn-update</strong>: se toma un valor desde el input con este boton y actualiza la cantidad del producto.<br>
- <strong>Abrir carrito</strong>: Se utiliza para hacer submit del carrito seleccionado desde el formulario.<br>
- <strong>btn-agregar-producto:</strong>: toma desde el desplegable el producto y la cantidad desde un input para crear o actualizar el producto del carrito.
</p>

<h3>🔄 ROUTES</h3>

<h4>views.router.js</h4>
<p>
<strong>Maneja las rutas de vistas principales.</strong><br>
- <strong>GET /</strong>: Renderiza página de inicio con listado de productos desde products.json.<br>
- <strong>GET /carts</strong>: Renderiza página de carrito con productos guardados en carts.json.<br>
- <strong>GET /realTimeProducts</strong>: Renderiza página de productos en tiempo real con WebSocket.
</p>

<h4>carts.routes.js</h4>
<p>
<strong>Gestiona operaciones del carrito de compras.</strong><br>
- <strong>POST /carts</strong>: Agrega un producto al carrito. Busca producto por ID en products.json, lo añade a carts.json y retorna confirmación.<br>
- <strong>DELETE /carts</strong>: Elimina un producto del carrito por ID, actualiza carts.json y retorna confirmación.
</p>

<h3>👁️ VIEWS </h3>

<h4>layouts/main.handlebars</h4>
<p>
- Estructura HTML principal.<br>
- Carga CSS desde style.css.<br>
- Define header con navegación (enlaces a Productos, Carrito, Crear/eliminar).<br>
- Footer con información legal y derechos.<br>
- Placeholder {{{body}}} donde se renderiza el contenido específico de cada página.
</p>


<h4>home.handlebars</h4>
<p>
<strong>Página principal con listado de productos.</strong><br>
- Itera sobre array 'products'.<br>
- Botón "Agregar al carrito" a POST /carts.
</p>

<h4>homeProductId.handlebars</h4>
<p>
<strong>Página principal con listado de productos.</strong><br>
- Itera sobre array 'products'.<br>
- Botón "Agregar al carrito" a POST /carts.
</p>

<h4>carts.handlebars</h4>
<p>
<strong>Página de carrito de compras.</strong><br>
- Itera sobre array 'carts' (productos guardados).<br>
- Botón "Eliminar del carrito" que envía DELETE a /carts.
</p>

---

📚 Autor

Matías Antelo

Proyecto desarrollado para la entrega de Backend I (Coderhouse).