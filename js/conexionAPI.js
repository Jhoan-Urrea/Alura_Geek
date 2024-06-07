
/*Metodo que nos permite listar los productos que se encuentra en nuestro archivo .json */
async function listarProductos(){
    const conexion = await fetch("http://localhost:3001/productos",{
        method:"GET",
        headers:{
        "Content-type":"application/json"
        }
    });
    const conexionConvertida=await conexion.json();
    console.log(conexion);
    console.log(conexionConvertida);
    return conexionConvertida;
}

/* Metodo que nos permite crear un nuevo producto en nuestro archivo .json */
async function crearProducto(nombre,precio,imagen){
    const conexion= await fetch("http://localhost:3001/productos",{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify({
        nombre:nombre,
        precio:precio,
        imagen:imagen
    })
    })
    if(!conexion.ok){
        throw new Error("No fue posible enviar el producto");
    }
    const conexionConvertida = await conexion.json();
    return conexionConvertida;
}

/* Metodo que realiza la eliminacion de un producto, a traves de su identificacion ingresado por parametro */
async function eliminarProducto(productId){
    const conexion= await fetch(`http://localhost:3001/productos/${productId}`,{
    method:"DELETE",
    headers:{
        "Content-type":"application/json"
    },
})
}

/*Exportamos los metodos que estan conectados a nuestro archivo .json */
export const conexionAPI={
    listarProductos,crearProducto, eliminarProducto
}