

document.addEventListener('DOMContentLoaded', () => {
    const socket2 = io("http://localhost:3000")
    const socket = new WebSocket("ws://localhost:3002");

    socket.addEventListener("open", () => {
        console.log("Conexión establecida");
    });

    socket.addEventListener("close", () => {
        console.log("Conexión cerrada");
    });

    socket.addEventListener("error", (error) => {
        console.error("Error en la conexión:", error);
    });

    const peliculaId = localStorage.getItem('idpelicula');
    const serieId = localStorage.getItem('idSerie');

    const elementosPelicula = document.querySelectorAll('.ocultar-pelicula');
    const elementosSerie = document.querySelectorAll('.ocultar-serie');

    if (peliculaId !== null && peliculaId !== 'undefined') {
        localStorage.removeItem('idSerie');

        elementosPelicula.forEach(elemento => {
            elemento.style.display = 'block';
        });
        elementosSerie.forEach(elemento => {
            elemento.style.display = 'none';
        });

        axios.get(`http://localhost:3000/api/peliculas/id/${peliculaId}`)
            .then(response => {

                const data = response.data;
                console.log(data);
                if (data && data.length > 0 && data[0].nombre) {
                // Actualiza elementos HTML con datos de la película
                document.getElementById('titulo-pelicula').textContent = data[0].nombre;
                document.getElementById('descripcion-pelicula').textContent = data[0].descripcion;
                document.getElementById('imagen-pelicula').src = `../${data[0].imagen}`;
                document.getElementById('trailer-iframe').src = `https://www.youtube.com/embed/${data[0].linkTriler}`;

                // Envía un mensaje al servidor WebSocket con el nombre de la película
                socket.send(JSON.stringify({ tipo: 'pelicula', nombre: data[0].nombre }));

                alert(`Nombre de la película: ${data[0].nombre}`);
                console.log('Mensaje a enviar al servidor WebSocket:', { tipo: 'pelicula', nombre: data[0].nombre });

            } else {
                console.log('La propiedad nombre no está presente en los datos recibidos.');
            }
            })
            .catch(error => {
                console.error('Error al obtener los detalles de la película:', error);
            });

    } else if (serieId !== null) {
        localStorage.removeItem('idpelicula');
        elementosSerie.forEach(elemento => {
            elemento.style.display = 'block';
        });
        elementosPelicula.forEach(elemento => {
            elemento.style.display = 'none';
        });



        // Solicita detalles de la serie y actualiza la página
        axios.get(`http://localhost:3000/api/series/${serieId}`)
            .then(response => {
                const data = response.data;

                const tituloPelicula = document.getElementById('titulo-pelicula');
                const descripcionPelicula = document.getElementById('descripcion-pelicula');
                const imagenPelicula = document.getElementById('imagen-pelicula');
                const trailerIframe = document.getElementById('trailer-iframe');

                tituloPelicula.textContent = data.nombre;
                descripcionPelicula.textContent = data.descripcion;
                imagenPelicula.src = `../${data.imagen}`;
                trailerIframe.src = `https://www.youtube.com/embed/${data.linkTriler}`;
            })
            .catch(error => {
                console.error('Error al obtener los detalles de la serie:', error);
            });
    }

   
});


document.addEventListener('DOMContentLoaded', function () {
     // Formulario de nuevo 
     const formulario = document.getElementById("nuevo-comentario-form");
     const comentariosContainer = document.querySelector(".comentarios");
 

     var socketGlobal;
     var mensaje=[];


     formulario.addEventListener("submit", function (e) {
         e.preventDefault();
 
         const nombre = document.getElementById("nombre").value;
        
         socketGlobal.emit('chat message', nombre, 1);
         
     });
    
    

    const joinRoom = (socket, roomName) => {
       

        socket.emit('join room', roomName);
    };

    const setMessages = (newMessages) => {
        console.log(newMessages);
    };

    const conexionSocket = () => {
        const newSocket = io('http://localhost:3000');

        newSocket.on('connect', () => {
            console.log('Conectado al servidor Socket.IO');

            
                joinRoom(newSocket, 1);
            
        });

        newSocket.on('chat message', (msg, roomName) => {
            
            mensaje.push(msg.msg);
            
         const nuevoComentario = document.createElement("div");
         nuevoComentario.classList.add("comentario");
         nuevoComentario.innerHTML = `
             <h4>${mensaje[mensaje.length-1]}</h4>
         
         `;
 
         comentariosContainer.appendChild(nuevoComentario);
 
         document.getElementById("nombre").value = "";
            
            
        });
        socketGlobal= newSocket;

        // Puedes realizar otras acciones según tus necesidades

        return () => {
            newSocket.disconnect();
        };
    };

    // Llamada a la función
    conexionSocket();
});
