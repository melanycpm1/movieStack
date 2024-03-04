console.log(location)

const urlParams = new URLSearchParams(location.search);
//
const id =urlParams.get("id");
const $main=document.querySelector("#main");
const entrarId = moviesData.data.find(peli => peli._id === id);
console.log(entrarId);

$main.innerHTML=`
<section class="grid grid-rows-2 grid-cols-2 items-center justify-items-center relative top-7">
            <div>
                <img src="https://moviestack.onrender.com/static/${entrarId.image}" alt="img${entrarId.title}"
                    class="w-96 h-72 object-cover">
            </div>
            <div class="w-3/4">
                <h2 class="text-5xl font-semibold tituloPelicula">${entrarId.title}</h2>
                <span class="text-lg font-light generoPeli">${entrarId.genres}</span><br>
                <p class="font-extralight">${entrarId.overview}</p>
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
                        <td class="border-4 border-black border-solid">${entrarId.original_language}</td>
                        <td class="border-4 border-black border-solid">${entrarId.release_date}</td>
                        <td class="border-4 border-black border-solid">${entrarId.runtime}</td>
                        <td class="border-4 border-black border-solid">${entrarId.status}</td>
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
                        <td class="border-4 border-black border-solid">${entrarId.vote_average}</td>
                        <td class="border-4 border-black border-solid">${entrarId.budget}</td>
                        <td class="border-4 border-black border-solid">${entrarId.revenue}</td>
                    </tr>
                </table>
            </div>
        </section>`