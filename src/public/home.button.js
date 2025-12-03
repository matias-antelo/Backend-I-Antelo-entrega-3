//boton para mostrar producto.
document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.btn-agregar');
  botones.forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      window.location.href = `/api/products/${id}`;
    });
  });
})

//boton de agregar al carrito.
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".btn-agregar1");

  botones.forEach(btn => {
    btn.addEventListener("click", async () => {
      const productId = btn.dataset.id;

      const { value: cartId } = await Swal.fire({
        title: "Agregar al carrito",
        text: "Ingrese el número de carrito:",
        input: "number",
        inputAttributes: {
          min: 1,
          step: 1
        },
        inputValidator: (value) => {
          if (!value || value <= 0) {
            return "Debe ingresar un número de carrito válido";
          }
        },
        showCancelButton: true,
        confirmButtonText: "Agregar"
      });

      if (!cartId) return;

      try {
        // Verificar si el carrito existe
        let cart = await fetch(`/carts/${cartId}`).then(r => r.json());

        if (cart?.message === "Carrito no encontrado") {
          // Crear carrito
          await fetch("/carts/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cid: cartId })
          });
        }

        // Agregar producto
        await fetch(`/carts/${cartId}/product/${productId}`, {
          method: "POST"
        });

        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          text: `El producto fue agregado al carrito ${cartId}`
        });

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo agregar el producto al carrito."
        });
      }
    });
  });
});

//boton de abrir carrito.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("carritoForm");
  const select = document.getElementById("carritoSelect");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); 
      const cartNumber = select.value;
      if (!cartNumber) return;
      window.location.href = `/carts/view/${cartNumber}`;
    });
  }
});

