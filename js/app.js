let affiche = document.getElementById('affiche');
let form = document.querySelector('form');
let apiKey = '7843f8d22a43911f15301ef8d76338ae';

{/* <div>${dataElement[i].title}</div> <h5>${dataElement[i].title} </h5>   poster_path */}


// fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false`)
// .then((res) => res.json())
// .then((data) => getFilm(data))

// form.addEventListener("submit", (e) =>{
//     e.preventDefault();
//     let inputValue = document.querySelector('.input').value;
//     console.log(inputValue);
//     if (inputValue) {
//         fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}`)
//         .then((res) => res.json())
//         .then((data) => {
//             getFilm(data)
//         })
//     }else{

//     }
// })

// const getFilm = (data) =>{
//         let dataElement = data.results;
//         affiche.innerHTML = "";
//         console.log(dataElement);
//         if (dataElement.length != 0) {
//             for (let i = 0; i < dataElement.length; i++) {
//                 console.log(dataElement[i].title);
//                 affiche.innerHTML += `
//         <div class="card-group col-4 img">
//             <div class="card">
//                     <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${dataElement[i].poster_path}" alt="Card image cap">
//                 <div class="card-body">
//                 <h5 class="card-title">${dataElement[i].title}</h5>
//                     <p class="card-text">${dataElement[i].overview}</p>
//                 <p class="card-text"><small class="text-muted">${dataElement[i].release_date}</small></p>
//                 </div>
//              </div>
//         </div>
    
//                 `;     
//             }
//         };
//         }
      
axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false`)
.then((resp) => getFilm(resp))


form.addEventListener("submit", (e) =>{
    e.preventDefault();
    let inputValue = document.querySelector('.input').value;
    console.log(inputValue);
    if (inputValue) {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}`)
        .then((resp) => getFilm(resp))
            // getFilm(resp.data.results))
    }
})


    const getFilm = (resp) =>{
                let dataElement = resp.data.results;
                affiche.innerHTML = "";
                if (dataElement.length != 0) {
                    for (let i = 0; i < dataElement.length; i++) {
                        // console.log(dataElement[i].title);
                        affiche.innerHTML += `
                <div class="card-group col-4 img">
                    <div class="card">
                            <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${dataElement[i].poster_path}" alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title">${dataElement[i].title}</h5>
                            <p class="card-text">${dataElement[i].overview}</p>
                        <p class="card-text"><small class="text-muted">${dataElement[i].release_date}</small></p>
                        </div>
                     </div>
                </div>
            
                        `;     
                    }
                };
                }