import { conexionAPI } from "./conexionAPI.js";

const listaProdutos = document.querySelector("[data-lista]");
let delete_buttons;

/* Metodo que construye la tarjeta del producto en nuestro sitio web, creando su estructura y definiendo sus clase de estilo */
export default function construyeCard(nombre, precio, imagen) {
  const producto = document.createElement("div");
  producto.className = "product";

  producto.innerHTML = `
    <img class=".remove-bg" src="${imagen}" alt="">
    <div class="product_info">
        <div class="description">
            <h3>${nombre}</h3>
            <h4>$ ${precio} COP</h4>
        </div>
        <img class="delete_button" src="assets/icon/delete_icon.svg" alt="">
    </div>`;
  return producto;
}

/* Metodo que lista los productos encontrados en nuesto archivo .json y los proyecta en nuestra pagina web */
async function listarProductos() {
  try {
    const listaAPI = await conexionAPI.listarProductos();
    listaAPI.forEach((element) =>
      listaProdutos.appendChild(
        construyeCard(element.nombre, element.precio, element.imagen)
      )
    );
    delete_buttons = document.querySelectorAll(".delete_button");
    console.log(delete_buttons);
    delete_buttons.forEach((element) => {
      element.addEventListener("click", function () {
        const productoSeleccionado = element.closest(".product");
        const nombreProducto =
          productoSeleccionado.querySelector("h3").textContent;
        console.log(nombreProducto);
        console.log(listaAPI);
        listaAPI.forEach((producto) => {
          if (producto.nombre === nombreProducto) {
            console.log(producto.id);
            eliminarProducto(producto.id);
          }
        });
      });
    });
  } catch {
    listaProdutos.innerHTML = `<h3 >⚠ No fue posible cargar la lista de productos</h3>`;
  }
}

/* Metodo que nos permite eliminar el producto por identificacion a traves de una solicitud  */
async function eliminarProducto(productId) {
  try {
    await conexionAPI.eliminarProducto(productId);
  } catch (error) {}
}

listarProductos();
