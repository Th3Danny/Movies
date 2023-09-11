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
        imagen.src = "../"+pelicula.imagen;
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
    }

    function getMoviesFromAPI() {
        return axios
            .get('http://localhost:3003/peliculas')
            .then((response) => {
                console.log('Datos de películas obtenidos desde la API:', response.data.peliculas);
                return response.data.peliculas;
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