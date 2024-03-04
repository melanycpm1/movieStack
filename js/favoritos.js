const url_base = 'https://moviestack.onrender.com/api/movies';
const apiKey = '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd';
const $listaPeliculas = document.querySelector("#listaPeliculas");

const init = {
    method: "GET",
    headers: {
        "x-api-key": apiKey
    }
};

let favoritos = JSON.parse(localStorage.getItem("favoritos"));
let mainFavs=document.querySelector("#mainFavs");
function crearTarjetaFavorita(favorito) {
    const article = document.createElement("article");
    const tituloPelicula = document.createElement("h3");
    const imgPelicula = document.createElement("img");
    const descripcion = document.createElement("p");
    const genero = document.createElement("p");
    const icono = document.createElement("i");

    article.classList.add("text-center", "border-black", "border-4", "divide-slate-950", "w-9/12", "h-500px");

    icono.innerHTML = `<i class="fa-solid fa-heart icono-corazon" data-id="${favorito.id}"  id="${favorito.id}"></i>`;
    tituloPelicula.innerHTML = `<h3 class="mb-3"><a href="../pages/detalles.html?id=${favorito.id}&nombre=${favorito.title}">${favorito.title}</a></h3>`;
    imgPelicula.src = `https://moviestack.onrender.com/static/${favorito.image}`;
    descripcion.textContent = favorito.overview;
    genero.textContent = favorito.genres.join(", ");

    article.appendChild(tituloPelicula);
    article.appendChild(imgPelicula);
    article.appendChild(descripcion);
    article.appendChild(genero);
    article.appendChild(icono);

    mainFavs.appendChild(article);
}

fetch(url_base, init)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error de red: La solicitud no fue exitosa.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos de películas:', data);
        
        console.log('Datos de favoritos:', favoritos);

        favoritos.forEach(favorito => {
            console.log('ID del favorito:', favorito);

            if (favorito) {
                const pelicula = data.movies.find(p => p.id === favorito);
                if (pelicula) {
                    crearTarjetaFavorita(pelicula);
                } else {
                    console.error('No se encontró la película con el ID proporcionado:', favorito);
                }
            } else {
                console.error('ID de película no válido:', favorito);
            }
        });
    })
    .catch(error => console.error('Error al obtener los datos de películas:', error));