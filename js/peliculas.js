document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');

    function crearTarjeta(pelicula) {
        const card = document.createElement('div');
        card.classList.add('card');
        // Modifica el data-url para incluir el ID de la película
        card.dataset.id = pelicula.idpelicula;
        card.dataset.expanded = 'false'; // Inicialmente, la tarjeta no está expandida
        const content = document.createElement('div');
        content.classList.add('content');

        const back = document.createElement('div');
        back.classList.add('back');

        const backContent = document.createElement('div');
        backContent.classList.add('back-content');

        const strong = document.createElement('strong');
        const imagen = document.createElement('img');
        imagen.src = "../" + pelicula.imagen;
        imagen.alt = pelicula.nombre;

        strong.appendChild(imagen);
        backContent.appendChild(strong);
        back.appendChild(backContent);
        content.appendChild(back);

        const front = document.createElement('div');
        front.classList.add('front');

        const frontContent = document.createElement('div');
        frontContent.classList.add('front-content');

        front.appendChild(frontContent);
        content.appendChild(front);

        card.appendChild(content);

        return card;
    }

    function actualizarTarjeta(card, descripcion, idpeliculas) {
        const frontContent = card.querySelector('.front-content');

        // Define la longitud máxima para la descripción que deseas mostrar
        const maxLength = 100;

        // Comprueba si se ha hecho clic en "Ver más" o no
        const isExpanded = card.dataset.expanded === 'true';

        // Verifica que la descripción exista y sea una cadena válida antes de operar sobre ella
        if (descripcion && typeof descripcion === 'string') {
            // Muestra una descripción recortada o completa debajo del botón según el estado
            const descripcionElement = document.createElement('p');
            descripcionElement.textContent = isExpanded ? descripcion : descripcion.slice(0, maxLength) + '...';
            frontContent.appendChild(descripcionElement);

            // Si no se ha hecho clic en "Ver más", agrega el botón abajo de la descripción
            if (!isExpanded) {
                const button = document.createElement('button');
                button.classList.add('card-button');
                button.textContent = 'Ver más';
                button.addEventListener('click', () => {
                    localStorage.removeItem('idSerie');
                    localStorage.setItem('idpelicula', idpeliculas);
                    // Cambia el estado a "expandido" al hacer clic en "Ver más"
                    card.dataset.expanded = 'true';
                    // Redirige a la página específica
                    window.location.href = "/pages/Especifica.html";
                });
                frontContent.appendChild(button);
            }
        } else {
            console.error('La descripción no es una cadena válida o está indefinida:', descripcion);

            // Puedes mostrar un mensaje o tomar alguna acción adicional si la descripción no es válida
            // Por ejemplo, puedes agregar un mensaje de error en lugar de la descripción
            const errorElement = document.createElement('p');
            errorElement.textContent = 'Descripción no disponible';
            frontContent.appendChild(errorElement);
        }
    }



    //Short Polling----------------------------------------------------------------------------------------
    
    const pollingInterval = 5000;
    setInterval(actualizarPeliculas, pollingInterval);

    actualizarPeliculas();

    function actualizarPeliculas() {
        getMoviesFromAPI()
            .then((peliculasDesdeAPI) => {
                cardsContainer.innerHTML = '';

                peliculasDesdeAPI.forEach((pelicula, index) => {
                    const card = crearTarjeta(pelicula);
                    cardsContainer.appendChild(card);

                    actualizarTarjeta(card, pelicula.descripcion, pelicula.idpeliculas);
                });
            })
            .catch((error) => {
                console.error('Error al obtener los datos de películas desde la API:', error);
            });
    }


    function getMoviesFromAPI() {
        return axios
            .get('http://localhost:3000/api/peliculas')
            .then((response) => {
                console.log('Datos de películas obtenidos desde la API:', response.data);
                return response.data;
            })
            .catch((error) => {
                console.error('Error al obtener los datos de películas desde la API:', error);
                throw error;
            });
    }

    getMoviesFromAPI()
        .then((peliculasDesdeAPI) => {
            peliculasDesdeAPI.forEach((pelicula, index) => {
                const card = crearTarjeta(pelicula);
                cardsContainer.appendChild(card);


                actualizarTarjeta(card, pelicula.descripcion, pelicula.idpeliculas);
            });
        })
        .catch((error) => {
            console.error('Error al obtener los datos de películas desde la API:', error);
        });

    


});


//Long Polling-------------------------------------------------------------------

async function obtenerNotificaciones() {
    try {

        const response = await fetch('http://localhost:3000/api/peliculas//nuevaNotificacion');
        const data = await response.json();
        console.log(data)
        window.alert(data.message)
        setTimeout(obtenerNotificaciones(), 6000)

    } catch (err) {
        console.error('Error al obtener notificaciones:', error.message);
    }
}

(
    obtenerNotificaciones()

)