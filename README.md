<img src="src/public/foto/CODER_CURSO.png" alt="Texto alternativo" width="300"/>

---

<h1>🧩 Proyecto Backend I - Entrega 2</h1>

Este proyecto implementa un servidor Node.js con Express que gestiona productos y carritos de compra, utilizando archivos JSON para asegurar la persistencia de la información, la implementación de handlebars para la interfaz con el usuario y websockets para actualizaciones en tiempo real.

<h2>⚙️ Estructura del proyecto</h2>

```
📦 Backend-I-Antelo
└── 📁 src/
    ├── 📁 data/
    │   ├── 📄 carts.json
    │   └── 📄 products.json
    │
    ├── 📁 public/
    │   ├── 📁 foto/
    │   │   └── 🖼️ CODER_CURSO.png
    │   ├── 📄 home.button.js
    │   └── 📄 realTimeProductos.js
    │
    ├── 📁 routes/
    │   ├── 📄 carts.routes.js
    │   └── 📄 views.router.js
    │
    ├── 📁 utils/
    │   └── 📄 utils.js
    │
    ├── 📁 views/
    │   ├── 📁 layouts/
    │   │   ├── 📄 main.handlebars
    │   │   └── 📄 style.css
    │   ├── 📄 carts.handlebars
    │   ├── 📄 home.handlebars
    │   └── 📄 realTimeProducts.handlebars
    │
    ├── 📄 app.js
    ├── 📄 .gitignore
    ├── 📄 package-lock.json
    ├── 📄 package.json
    └── 📄 README.md
```

<h2>📄 Documentación de Métodos</h2>

<h3>🌍 APP</h3>

<h4>app.js</h4>
<p>
- <strong>new Server()</strong>: Crea servidor WebSocket (Socket.io) para comunicación en tiempo real.<br>
- <strong>socket.on('nuevoProducto')</strong>: Recibe producto nuevo, asigna ID, guarda en JSON y emite a todos los clientes.<br>
- <strong>socket.on('eliminarProducto')</strong>: Elimina producto por ID, actualiza JSON y emite cambios.
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

<h3>🛠️ UTILS</h3>

<h4>utils.js</h4>
<p>
<strong>Funciones auxiliares para lectura y escritura de archivos JSON.</strong><br>
- <strong>readFile(path)</strong>: Lee archivos JSON de forma asíncrona. Retorna array vacío si el archivo no existe, o retorna el contenido.<br>
- <strong>writeFile(path, data)</strong>: Escribe datos en archivo JSON de forma asíncrona con formato indentado.<br>
</p>

<h3>🖥️ PUBLIC </h3>

<h4>home.button.js</h4>
<p>
<strong>Maneja interacciones en la página de inicio (agregar/eliminar del carrito).</strong><br>
- <strong>Agregar al carrito</strong>: Captura clic en botón, extrae ID del producto y envía POST a /carts.<br>
- <strong>Eliminar del carrito</strong>: Captura clic en botón, extrae ID y envía DELETE a /carts.
</p>

<h4>realTimeProductos.js</h4>
<p>
<strong>Maneja formulario de creación de productos y comunicación WebSocket en tiempo real.</strong><br>

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

<h4>carts.handlebars</h4>
<p>
<strong>Página de carrito de compras.</strong><br>
- Itera sobre array 'carts' (productos guardados).<br>
- Botón "Eliminar del carrito" que envía DELETE a /carts.
</p>

<h4>realTimeProducts.handlebars</h4>
<p>
<strong>Página para crear y gestionar productos en tiempo real con WebSocket.</strong><br>
- Formulario con campos: title, price, description, stock, category.<br>


---

📚 Autor

Matías Antelo

Proyecto desarrollado para la entrega de Backend I (Coderhouse).