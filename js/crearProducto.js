import { conexionAPI } from "./conexionAPI.js";

const form = document.querySelector("[data-formulario]");

/*Metodo que nos permite obtener los valores del formulario para crear un producto nuevo */
async function crearProducto(evento){
    evento.preventDefault();
    const name= document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image=document.querySelector("[data-image]").value;

    try{
        await conexionAPI.crearProducto(name,price,image)
    }catch(e){
        alert(e);
    }
}

/* Se añade un evento al formulario para enviar los datos y crear un producto */
form.addEventListener("submit",evento=>crearProducto(evento));