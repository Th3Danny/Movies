document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');

    function crearTarjeta(serie) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = serie.idserie;
        card.dataset.expanded = 'false';
        const content = document.createElement('div');
        content.classList.add('content');

        const back = document.createElement('div');
        back.classList.add('back');

        const backContent = document.createElement('div');
        backContent.classList.add('back-content');

        const strong = document.createElement('strong');
        const imagen = document.createElement('img');
        imagen.src = "../"+serie.imagen; // Cambiar "pelicula" por "serie"
        imagen.alt = serie.nombre; // Cambiar "pelicula" por "serie"



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

    function actualizarTarjeta(card, descripcion, idserie) {
        const frontContent = card.querySelector('.front-content');
        const maxLength = 100;
        const isExpanded = card.dataset.expanded === 'true';

        const descripcionElement = document.createElement('p');
        descripcionElement.textContent = isExpanded ? descripcion : descripcion.slice(0, maxLength) + '...';
        frontContent.appendChild(descripcionElement);

        if (!isExpanded) {
            const button = document.createElement('button');
            button.classList.add('card-button');
            button.textContent = 'Ver más';
            button.addEventListener('click', () => {
                localStorage.removeItem('idpelicula');
                localStorage.setItem('idSerie', idserie);
                card.dataset.expanded = 'true';
                window.location.href = "../pages/Especifica.html";
            });
            frontContent.appendChild(button);
        }
    }

    function getMoviesFromAPI() {
        return axios
            .get('http://localhost:3003/series')
            .then((response) => {
                console.log('Datos de series obtenidos desde la API:', response.data.series);
                return response.data.series;
            })
            .catch((error) => {
                console.error('Error al obtener los datos de series desde la API:', error);
                throw error;
            });
    }
    getMoviesFromAPI()
    .then((seriesDesdeAPI) => {
        if (seriesDesdeAPI && Array.isArray(seriesDesdeAPI)) {
            seriesDesdeAPI.forEach((serie, index) => {
                const card = crearTarjeta(serie);
                cardsContainer.appendChild(card);

                actualizarTarjeta(card, serie.descripcion, serie.idseries);
            });
        } else {
            console.error('La respuesta de la API no contiene datos válidos:', seriesDesdeAPI);
        }
    })
    .catch((error) => {
        console.error('Error al obtener los datos de series desde la API:', error);
    });

});