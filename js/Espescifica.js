document.addEventListener('DOMContentLoaded', () => {
    const peliculaId = localStorage.getItem('idpelicula');
    const serieId = localStorage.getItem('idSerie');

    // Obtén los elementos relacionados con películas y series
    const elementosPelicula = document.querySelectorAll('.ocultar-pelicula');
    const elementosSerie = document.querySelectorAll('.ocultar-serie');

    if (peliculaId !== null) {
        localStorage.removeItem('idSerie');
        // Es una película, muestra los elementos de película y oculta los de serie
        elementosPelicula.forEach(elemento => {
            elemento.style.display = 'block';
        });
        elementosSerie.forEach(elemento => {
            elemento.style.display = 'none';
        });

        // Realiza la solicitud para obtener los detalles de la película y actualiza la página
        axios.get(`http://localhost:3003/peliculas/${peliculaId}`)
            .then(response => {
                // Procesa los datos y actualiza la página
                const data = response.data;
                console.log('Detalles de la película:', data);

                // Obtén los elementos HTML relacionados con películas
                const tituloPelicula = document.getElementById('titulo-pelicula');
                const descripcionPelicula = document.getElementById('descripcion-pelicula');
                const imagenPelicula = document.getElementById('imagen-pelicula');
                const trailerIframe = document.getElementById('trailer-iframe');

                // Actualiza los elementos HTML con los datos de la película
                tituloPelicula.textContent = data.nombre;
                descripcionPelicula.textContent = data.descripcion;
                imagenPelicula.src = "../" + data.imagen;
                trailerIframe.src = "https://www.youtube.com/embed/" + data.linkTriler;

            })
            .catch(error => {
                console.error('Error al obtener los detalles de la película:', error);
            });
    } else if (serieId !== null) {
        // Es una serie, muestra los elementos de serie y oculta los de película
        localStorage.removeItem('idpelicula');
        elementosSerie.forEach(elemento => {
            elemento.style.display = 'block';
        });
        elementosPelicula.forEach(elemento => {
            elemento.style.display = 'none';
        });

        // Realiza la solicitud para obtener los detalles de la serie y actualiza la página
        axios.get(`http://localhost:3003/series/${serieId}`)
            .then(response => {
                // Procesa los datos y actualiza la página
                const data = response.data;
                console.log('Detalles de la serie:', data);

                // Obtén los elementos HTML relacionados con series
                const tituloPelicula = document.getElementById('titulo-pelicula');
                const descripcionPelicula = document.getElementById('descripcion-pelicula');
                const imagenPelicula = document.getElementById('imagen-pelicula');
                const trailerIframe = document.getElementById('trailer-iframe');

                // Actualiza los elementos HTML con los datos de la película
                tituloPelicula.textContent = data.nombre;
                descripcionPelicula.textContent = data.descripcion;
                imagenPelicula.src = "../" + data.imagen;
                trailerIframe.src = "https://www.youtube.com/embed/" + data.linkTriler;
                

            })
            .catch(error => {
                console.error('Error al obtener los detalles de la serie:', error);
            });
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("nuevo-comentario-form");
    const comentariosContainer = document.querySelector(".comentarios");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtén los valores del formulario
        const nombre = document.getElementById("nombre").value;
        const comentario = document.getElementById("comentario").value;

        // Crea un nuevo elemento de comentario con el mismo formato
        const nuevoComentario = document.createElement("div");
        nuevoComentario.classList.add("comentario");
        nuevoComentario.innerHTML = `
        <h4>${nombre}</h4>
        <p>${comentario}</p>
      `;

        // Agrega el nuevo comentario al contenedor de comentarios
        comentariosContainer.appendChild(nuevoComentario);

        // Limpia el formulario
        document.getElementById("nombre").value = "";
        document.getElementById("comentario").value = "";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("nuevo-comentario-form");
    const comentariosContainer = document.querySelector(".comentarios");

    formulario.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtén los valores del formulario
      const nombre = document.getElementById("nombre").value;
      const comentario = document.getElementById("comentario").value;

      // Crea un nuevo elemento de comentario con el mismo formato
      const nuevoComentario = document.createElement("div");
      nuevoComentario.classList.add("comentario");
      nuevoComentario.innerHTML = `
        <h4>${nombre}</h4>
        <p>${comentario}</p>
      `;

      // Agrega el nuevo comentario al contenedor de comentarios
      comentariosContainer.appendChild(nuevoComentario);

      // Limpia el formulario
      document.getElementById("nombre").value = "";
      document.getElementById("comentario").value = "";
    });
});
