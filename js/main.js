// const urlParams = new URLSearchParams(window.location.search);
// const myParam   = urlParams.get('id');

//obtener informacion de la api















//seccion de comentarios 


// Obtener todos los elementos del carrusel
const carouselItems = document.querySelectorAll('.carousel-item');

// Agregar un controlador de eventos a cada elemento del carrusel
carouselItems.forEach(item => {
  // Cambiar el cursor al pasar el cursor sobre el elemento
  item.style.cursor = 'pointer';

  // Agregar un controlador de eventos clic para redirigir al usuario
  item.addEventListener('click', () => {
    // Obtener la URL de redirección desde el atributo "data-url" del elemento del carrusel
    const redirectURL = item.getAttribute('data-url');
    
    // Redirigir al usuario a la URL deseada
    window.location.href = redirectURL;
  });
});



// Obtener todos los botones dentro de las cards
const cardButtons = document.querySelectorAll('.card-button');

// Agregar un controlador de eventos clic a cada botón
cardButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Obtener la URL de redirección desde el atributo "data-url" del botón
    const redirectURL = button.getAttribute('data-url');
    
    // Redirigir al usuario a la URL deseada
    window.location.href = redirectURL;
  });
});





   // script.js
   document.addEventListener('DOMContentLoaded', function() {
    const carouselList = document.querySelector('.carousel-list');
    const carouselItems = document.querySelectorAll('.carousel-item');

    let currentIndex = 0;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }

    function updateCarousel() {
        const translateX = -currentIndex * 100;
        carouselList.style.transform = `translateX(${translateX}%)`;
    }

    setInterval(nextSlide, 3000); // Cambia automáticamente cada 3 segundos
});
   



class Api {
    constructor(_endpoint) {
        this.domain   = "https://api.themoviedb.org/3/";
        this.endpoint = _endpoint;
    }

    async get(params) {
        let URL = this.domain+this.endpoint+params;
        return await fetch(URL);
    }
}

class MovieService extends Api {
    
    constructor() {
        super("movie/157336");
    }

    async getMovies(params) {
        return this.get(params);
    }

}

let moviesService = new MovieService();
let params = "?api_key=1ba39c30492a7fe2105c6bbbbbc99b4b";

let response = moviesService.getMovies(params);
response.then(res => res.json())
    .then(res => console.log(res));


let movies = [
    {
        id:1,
        title:"Nueva pelicula",
        url_image:"https://www.themoviedb.org/t/p/w440_and_h660_face/fNtqD4BTFj0Bgo9lyoAtmNFzxHN.jpg"
    },
    {
        id:1,
        title:"Nueva pelicula",
        url_image:"https://www.themoviedb.org/t/p/w440_and_h660_face/fNtqD4BTFj0Bgo9lyoAtmNFzxHN.jpg"
    },
    {
        id:1,
        title:"Nueva pelicula",
        url_image:"https://www.themoviedb.org/t/p/w440_and_h660_face/fNtqD4BTFj0Bgo9lyoAtmNFzxHN.jpg"
    },
    {
        id:1,
        title:"Nueva pelicula",
        url_image:"https://www.themoviedb.org/t/p/w440_and_h660_face/fNtqD4BTFj0Bgo9lyoAtmNFzxHN.jpg"
    }
];



let content = document.getElementById("peliculas-items");

movies.map((movie) => {
    let peliculaCard = document.createElement("div");
    peliculaCard.className = "pelicula";
    let img = document.createElement("img");
    img.src = movie.url_image;

    let titleMovie = document.createElement("h4");
    titleMovie.textContent = movie.title;
    titleMovie.className = "pelicula-titulo";

    peliculaCard.appendChild(img);
    peliculaCard.appendChild(titleMovie);
    content.appendChild(peliculaCard);
});
