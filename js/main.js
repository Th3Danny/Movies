document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cards-container');

  function crearTarjeta(pelicula) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.url = `URL_CARD_${pelicula.idpeliculas}`;

    const content = document.createElement('div');
    content.classList.add('content');

    const back = document.createElement('div');
    back.classList.add('back');

    const backContent = document.createElement('div');
    backContent.classList.add('back-content');

    const strong = document.createElement('strong');
    strong.innerHTML = `<img src="./images/${pelicula.nombre}.jpg" alt="${pelicula.nombre}">`;

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

  function actualizarTarjeta(card, descripcion, url) {
    const frontContent = card.querySelector('.front-content');
    const descripcionElement = document.createElement('p');
    descripcionElement.textContent = descripcion;
    frontContent.appendChild(descripcionElement);

    const button = document.createElement('button');
    button.classList.add('card-button');
    button.textContent = 'Ver más';
    button.addEventListener('click', () => {
      window.location.href = url;
    });
    frontContent.appendChild(button);
  }

  function getMoviesFromAPI() {
    return axios.get('http://localhost:3003/peliculas')
      .then(response => {
        console.log('Datos de películas obtenidos desde la API:', response.data.peliculas);
        return response.data.peliculas;
      })
      .catch(error => {
        console.error('Error al obtener los datos de películas desde la API:', error);
        throw error;
      });
  }

  getMoviesFromAPI()
    .then((peliculasDesdeAPI) => {
      peliculasDesdeAPI.forEach((pelicula, index) => {
        const card = crearTarjeta(pelicula);
        cardsContainer.appendChild(card);

        const url = `../pages/Espesifica.html?id=${pelicula.idpeliculas}`;
        actualizarTarjeta(card, pelicula.descripcion, url);
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos de películas desde la API:', error);
    });
});