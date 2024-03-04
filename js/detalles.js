const url_base = 'https://moviestack.onrender.com/api/movies';
const apiKey = '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd';

const init = {
    method: "GET",
    headers: {
        "x-api-key": apiKey
    }
};

const $main = document.querySelector("#main");

function cartaDePeli(pelicula) {
    $main.innerHTML = `
                <section   section class="grid grid-rows-2 grid-cols-2 items-center justify-items-center relative top-7">
                    <div>
                        <img src="https://moviestack.onrender.com/static/${pelicula.image}" alt="img${pelicula.title}"
                            class="w-96 h-72 object-cover">
                    </div>
                    <div class="w-3/4">
                        <h2 class="text-5xl font-semibold tituloPelicula">${pelicula.title}</h2>
                        <span class="text-lg font-light generoPeli">${pelicula.genres}</span><br>
                        <p class="font-extralight">${pelicula.overview}</p>
                    </div>
        
                    <div>
                        <table>
                            <tr>
                                <td class="border-4 border-black border-solid">original languaje</td>
                                <td class="border-4 border-black border-solid">release date</td>
                                <td class="border-4 border-black border-solid">runtime</td>
                                <td class="border-4 border-black border-solid">status</td>
                            </tr>
                            <tr>
                                <td class="border-4 border-black border-solid">${pelicula.original_language}</td>
                                <td class="border-4 border-black border-solid">${pelicula.release_date}</td>
                                <td class="border-4 border-black border-solid">${pelicula.runtime}</td>
                                <td class="border-4 border-black border-solid">${pelicula.status}</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tr>
                                <td class="border-4 border-black border-solid">vote average</td>
                                <td class="border-4 border-black border-solid">budget</td>
                                <td class="border-4 border-black border-solid">revenue</td>
                            </tr>
                            <tr>
                                <td class="border-4 border-black border-solid">${pelicula.vote_average}</td>
                                <td class="border-4 border-black border-solid">${pelicula.budget}</td>
                                <td class="border-4 border-black border-solid">${pelicula.revenue}</td>
                            </tr>
                        </table>
                    </div>
                </section>`;
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch(url_base, init)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error de red: La solicitud no fue exitosa.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos de películas:', data);
        const pelicula = data.movies.find(p => p.id === id);
        if (pelicula) {
            cartaDePeli(pelicula);
        } else {
            console.error('No se encontró la película con el ID proporcionado:', id);
        }
    })
    .catch(error => console.error('Error al obtener los datos de películas:', error));
