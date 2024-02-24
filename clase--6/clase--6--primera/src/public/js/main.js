console.log("Siii funcionaaaa!!");
const socket = io();

//Para enviar mensajes desde el cliente hacia el servidor, utilizamos la palabrita "emit", con el id del evento y el contenido de dicho mensaje. 

//Recuerden!: Los ids de los eventos deben coincidir para que el mensaje llegue correctamente. 


socket.emit("mensaje", "Hola Mundo, soy el cliente!");

//Recibimos el mensaje del servidor: 

socket.on("saludito", (data) => {
    console.log(data);
})


//Recibimos el array de usuarios del servidor:

socket.on("usuarios", (data) => {
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = "";
    data.forEach( usuario => {
        listaUsuarios.innerHTML += `<li> ${usuario.nombre} - ${usuario.apellido} </li>`
    })

    socket.disconnect();
    //Cierro la conexion con el servidor desde el cliente. 
})