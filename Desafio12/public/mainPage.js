
let formualario = document.getElementById("formulario");
let nombre = document.getElementById("nomprod");
let precio = document.getElementById("precio");
let img = document.getElementById("img");
let info = document.getElementById("info");


formualario.addEventListener("submit", e => {
    e.preventDefault()
    mostrar()
    formualario.reset()
})

function mostrar() {
    let producto = {
        nombre: nombre.value,
        precio: precio.value,
        img: img.value
    }
    let html = `
    <tr>
            <td>${producto.nombre}</td>
            <td>$ ${producto.precio}</td>
            <td><img src="${producto.img}" alt="img"></td>
    </tr>
    `;
    info.innerHTML += html;
}

