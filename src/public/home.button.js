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

      // Verificar si el carrito existe
      let exists = await fetch(`/carts/api/${cartId}`);

      if (exists.status === 404) {
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
      window.location.href = `/carts/${cartNumber}`;
    });
  }
});

//borrar todos los productos del carrito
document.addEventListener("DOMContentLoaded", () => {
  const cartNumber = document.getElementById("cartNumberHidden")?.value;
  const deleteAllBtn = document.getElementById("btn-delete-all");

  if (!cartNumber || !deleteAllBtn) return;

  deleteAllBtn.addEventListener("click", async () => {
    const resp = await fetch(`/carts/${cartNumber}`, {
      method: "DELETE"
    });

    if (resp.ok) {
      Swal.fire({
        icon: "success",
        title: "Carrito vaciado",
      }).then(() => location.reload());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo borrar"
      });
    }
  });
});

//borrar un producto del carrito
document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".btn-delete");
  const cartNumber = document.getElementById("cartNumberHidden")?.value;

  if (!cartNumber) return;

  deleteButtons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const pid = btn.dataset.pid;

      const resp = await fetch(`/carts/${cartNumber}/products/${pid}`, {
        method: "DELETE"
      });

      if (resp.ok) {
        Swal.fire({
          icon: "success",
          title: "Producto eliminado",
        }).then(() => location.reload());
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el producto"
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {

  const cartNumber = document.getElementById("cartNumberHidden")?.value;

  document.querySelectorAll(".btn-update").forEach(btn => {
    btn.addEventListener("click", async () => {

      const pid = btn.dataset.id;
      const input = document.getElementById(`qty-${pid}`);
      const newQty = Number(input.value);

      const resp = await fetch(`/carts/api/${cartNumber}/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty })
      });

      if (resp.ok) {
        Swal.fire({
          icon: "success",
          title: "Cantidad actualizada"
        }).then(() => location.reload());
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar la cantidad"
        });
      }

    });
  });

});