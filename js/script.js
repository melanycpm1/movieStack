document.addEventListener("DOMContentLoaded", function () {
    const url_base = 'https://moviestack.onrender.com/api/movies';
    const apiKey = '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd';

    const init = {
        method: "GET",
        headers: {
            "x-api-key": apiKey
        }
    };

    const $genreFilter = document.querySelector("#genreFilter");
    const $nameFilter = document.querySelector("#nameFilter");
    const $movieList = document.querySelector("#moviesList");
    let peliculas = [];

    function crearCard(peliSecc) {
        const article = document.createElement("article");
        const tituloPelicula = document.createElement("h3");
        const imgPelicula = document.createElement("img");
        const descripcion = document.createElement("p");
        const genero = document.createElement("p");
        const icono = document.createElement("i");

        article.classList.add("text-center", "border-black", "border-4", "divide-slate-950", "w-9/12", "h-500px");

        icono.innerHTML = `<i class="fa-solid fa-heart icono-corazon" data-id="${peliSecc.id}"  id="${peliSecc.id}"></i>`;
        tituloPelicula.innerHTML = `<h3 class="mb-3"><a href="../pages/detalles.html?id=${peliSecc.id}&nombre=${peliSecc.title}">${peliSecc.title}</a></h3>`;
        imgPelicula.src = `https://moviestack.onrender.com/static/${peliSecc.image}`;
        descripcion.textContent = peliSecc.overview;
        genero.textContent = peliSecc.genres.join(", ");



        $movieList.appendChild(article);
        article.appendChild(tituloPelicula);
        article.appendChild(imgPelicula);
        article.appendChild(descripcion);
        article.appendChild(genero);
        article.appendChild(icono);
    }
    function crearFavoritoCard(pelicula) {
        const article = document.createElement("article");
        const tituloPelicula = document.createElement("h3");
        const imgPelicula = document.createElement("img");
        const descripcion = document.createElement("p");
        const genero = document.createElement("p");
        article.classList.add("text-center", "border-black", "border-4", "divide-slate-950", "w-9/12", "h-500px");
        tituloPelicula.innerHTML = `<h3 class="mb-3">${pelicula.title}</h3>`;
        imgPelicula.src = `https://moviestack.onrender.com/static/${pelicula.image}`;
        descripcion.textContent = pelicula.overview;
        genero.textContent = pelicula.genres.join(", ");
        article.appendChild(tituloPelicula);
        article.appendChild(imgPelicula);
        article.appendChild(descripcion);
        article.appendChild(genero);
        $movieList.appendChild(article);
    }

    function corazon() {
        const corazones = document.querySelectorAll(".icono-corazon");
        corazones.forEach(corazon => {
            const peliculaId = corazon.getAttribute("data-id");
            corazon.value = peliculaId;
            corazon.addEventListener("click", function () {
                let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

                const esFavoritaIndex = favoritos.indexOf(peliculaId);
                if (esFavoritaIndex !== -1) {
                    favoritos.splice(esFavoritaIndex, 1);
                    console.log("Película eliminada de favoritos");
                } else {
                    favoritos.push(peliculaId);
                    console.log("Película agregada a favoritos");
                }

                localStorage.setItem("favoritos", JSON.stringify(favoritos));
                mostrarFavoritos();
            });
        });
    }
    let $mainFavs = document.getElementById("mainFavs");

    function mostrarFavoritos() {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        if ($mainFavs) {
            $mainFavs.innerHTML = "";
            if (peliculas.length > 0) {
                peliculas.forEach(pelicula => {
                    if (favoritos.includes(pelicula.id)) {
                        crearFavoritoCard(pelicula);
                    }
                });
            } else {
                $mainFavs.textContent = "No se encontraron películas favoritas.";
            }
        } else {
            console.error("Error: Elemento main-favs no encontrado.");
        }
    }

    function filtrarPorNombreYGénero(peliculas) {
        $nameFilter.addEventListener("input", function () {
            const valorNameFilter = $nameFilter.value.toLowerCase();
            const selectedGenre = $genreFilter.value;
            const filtrarPorNombreYGenero = peliculas.filter((peliculaBuscada) => {
                const cumpleFiltroNombre = peliculaBuscada.title.toLowerCase().includes(valorNameFilter);
                const cumpleFiltroGenero = selectedGenre === "All" || peliculaBuscada.genres.includes(selectedGenre);
                return cumpleFiltroNombre && cumpleFiltroGenero;
            });

            actualizarLista(filtrarPorNombreYGenero);
            corazon();
        });
    }

    function actualizarLista(peliculas) {
        $movieList.innerHTML = "";
        peliculas.forEach((pelicula) => {
            crearCard(pelicula);
        });
    }

    $genreFilter.addEventListener("change", function () {
        const selectedGenre = $genreFilter.value;
        const filtrarPorGenero = peliculas.filter((peliculaBuscada) => {
            if (selectedGenre === "All") {
                return true;
            } else {
                return peliculaBuscada.genres.includes(selectedGenre);
            }
        });
        actualizarLista(filtrarPorGenero);
        corazon();
    });

    fetch(url_base, init)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data.movies)) {
                peliculas = data.movies;
                peliculas.forEach(pelicula => {
                    crearCard(pelicula);
                });
                filtrarPorNombreYGénero(peliculas);
                corazon();
                mostrarFavoritos();
            } else {
                throw new Error('Invalid response format: movies array not found');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});



