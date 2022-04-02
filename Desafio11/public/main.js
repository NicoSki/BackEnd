/*---------------------------
            CHAT
-----------------------------*/
//creo las conexiones a otros usuarios
const socket = new io();

//acciones con el formulario:
let formulario = document.getElementById("formulario");
let email = document.getElementById("email");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let alias = document.getElementById("alias");
let edad = document.getElementById("edad");
let img = document.getElementById("img");
let comentario = document.getElementById("comentario");
let mensaje = document.getElementById("mensajes");
let tabla = document.getElementById("tabla");


let usuarios = [];

//esto es para que no se refresque la pag y se reinicie el formulario
formulario.addEventListener("submit", e => {
  e.preventDefault()

  //creo el objeto que se va a enviar al index:
  let user_info = {
    email: email.value,
    nombre: nombre.value,
    apellido: apellido.value,
    edad: edad.value,
    alias: alias.value,
    img: img.value,
    comentario: comentario.value
  }
  usuarios.push(user_info)
  console.log("desde main.js", user_info);
  socket.emit('respuesta_formulario', user_info);
  formulario.reset()
})

//Lo divido en varios pasos para que sea mas comodo de leer:
//-
//-
//-
//aca lo agerego al div de mensajes del index.html
socket.on('respuesta_formulario', data => {
  respuesta_mensaje(data)
});

//creo el init de los mensajes
socket.on("init", data => {
  respuesta_mensaje(data);
});

//creo la funcion que devuelve mi mensaje
function respuesta_mensaje(data) {
  let mensaje_html = ``;
  for (const sms of data) {
    mensaje_html += `
    <div class="d-flex align-items-center border border-dark mb-2">
    <img src=${sms.img} alt="img">
      <p><strong>${sms.email}</strong>: ${sms.comentario}</p>
    </div>
    `;
  }
  mensaje.innerHTML = mensaje_html;
}

/*---------------------------
          PRODUCTOS
-----------------------------*/
socket.on("prod", data =>{
  let tabla_html = ``;
  for (const sms of data) {
    tabla_html += `
      <tr>
          <th>${sms.nombre}</th>
          <th>${sms.precio}</th>
          <th><img style="width: 60px;height: 60px;" src=${sms.img} alt="img"></th>
      </tr>
    `;
  }
  tabla.innerHTML = tabla_html;
})
