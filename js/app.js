let affiche = document.getElementById('affiche');
let form = document.querySelector('form');
let apiKey = '5c11dce65ccad3ca5428202e0c9b89f0';


{/* <div>${dataElement[i].title}</div> <h5>${dataElement[i].title} </h5>   poster_path */}

function page1(){
    console.log("cool");
    fetch(`
    https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
    .then((res) => res.json())
    .then((data) =>  {
    getFilm(data)
    
    let resultData = data.results;
    // console.log(resultData);
});
}

function page2(){
    console.log("cool");
    fetch(`
    https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=2`)
    .then((res) => res.json())
    .then((data) =>  {
    getFilm(data)
    
    let resultData = data.results;
    // console.log(resultData);
});
}

function page3(){
    console.log("cool");
    fetch(`
    https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=3`)
    .then((res) => res.json())
    .then((data) =>  {
    getFilm(data)
    
    let resultData = data.results;
    // console.log(resultData);
});
}

let ajout = 3;
let diminue ;
    function next(){
         ajout++
        console.log(ajout);
        
        fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${ajout}`)
        .then((res) => res.json())
        .then((data) =>  {
        getFilm(data)
        
        let resultData = data.results;
        // console.log(resultData);
    });
}


    function previous(){
        let diminue = ajout--;
        console.log(ajout);
        
        if (diminue <= 1) {
            ajout = 1;
        }
        else{
            fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${diminue}`)
        .then((res) => res.json())
        .then((data) =>  {
        getFilm(data)
        
        let resultData = data.results;
        // console.log(resultData);
    });
        }
        
}
    

fetch(`
https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false`)
.then((res) => res.json())
.then((data) =>  {
    getFilm(data)
    console.log(data);
});



// Recherche au Keyup
form.addEventListener("keyup", (e) =>{
    e.preventDefault();
    let inputValue = document.querySelector('.input').value;
    console.log(inputValue);
    if (inputValue) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
            getFilm(data)
        })
    }else{

    }
})


// Recherche au submit
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    let inputValue = document.querySelector('.input').value;
    console.log(inputValue);
    if (inputValue) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
            getFilm(data)
        })
    }else{

    }
})

// AddEventListener au click sur les images


const getFilm = (data) =>{
        let dataElement = data.results;
        affiche.innerHTML = "";
        // console.log(dataElement);
        if (dataElement.length != 0) {
            for (let i = 0; i < dataElement.length; i++) {
                // console.log(dataElement[i].title);
                affiche.innerHTML += `
                <div class="card-group col-4 img">
                    <div id ="card" class="card" onclick ="selection(${dataElement[i].id})">
                            <img  class="card-img-top" src="https://image.tmdb.org/t/p/w500${dataElement[i].poster_path}" alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title">${dataElement[i].title}</h5>
                        </div>
                    </div>
                </div>
    
                `;     
            }
        };

 }


 // Fonction de scroll infini
function loadPages(){
    let nextPage = 1;
    
    window.addEventListener('scroll', (e) =>{
        console.log("nextPage",nextPage);
        console.log(scrollY);
        
        const { scrollTop, scrollHeight, clientHeight} = document.documentElement;

        let defile = scrollHeight - clientHeight;
        console.log("scrollTop", scrollTop);
        console.log("scrollHeight", scrollHeight);
        console.log("clientHeight", clientHeight);
        console.log("defile", defile    );

        if (scrollY == defile) {
            nextPage++;
            fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${nextPage}`)
        .then((res) => res.json())
        .then((data) =>  {
       
        let dataElement = data.results;

            for (let i = 0; i < dataElement.length; i++) {
                // console.log(dataElement[i].title);
                affiche.innerHTML += `
                <div class="card-group col-4 img">
                    <div id ="card" class="card" onclick ="selection(${dataElement[i].id})">
                            <img  class="card-img-top" src="https://image.tmdb.org/t/p/w500${dataElement[i].poster_path}" alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title">${dataElement[i].title}</h5>
                        </div>
                    </div>
                </div>

                `;     
            }
        });
        }
        
    })
    
}


// loadPages();
let timeOut;
function attente (){
    timeOut = window.setTimeout(loadPages, 1000)
}
attente();

 // Selection des elements individuels
 function selection(id){
     console.log(id);
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
    .then((resp) => resp.json())
    .then((data) =>{
        // console.log(data);

        affiche.innerHTML = `  <div class="card-group col-4 img img2" >
                    <div class="card">
                            <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.overview}</p>
                         <p class="card-text"><small class="text-muted">${data.release_date}</small></p>
                        </div>
                      </div>
                </div>
            
                        `;     
        
    })
    
 }
 

// axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false`)
// .then((resp) => getFilm(resp))



// form.addEventListener("submit", (e) =>{
//     e.preventDefault();
//     let inputValue = document.querySelector('.input').value;
//     console.log(inputValue);
//     if (inputValue) {
//         axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}`)
//         .then((resp) => getFilm(resp))
//         .catch((error) => console.log(" erreur ",error))
//             // getFilm(resp.data.results))
//     }
// })


//     const getFilm = (resp) =>{
//         console.log(resp);
//                 let dataElement = resp.data.results;
//                 affiche.innerHTML = "";
//                 if (dataElement.length != 0) {
//                     for (let i = 0; i < dataElement.length; i++) {
//                         // console.log(dataElement[i].title);
//                         affiche.innerHTML += `
//                 <div class="card-group col-4 img">
//                     <div class="card">
//                             <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${dataElement[i].poster_path}" alt="Card image cap">
//                         <div class="card-body">
//                         <h5 class="card-title">${dataElement[i].title}</h5>
//                             <p class="card-text">${dataElement[i].overview}</p>
//                         <p class="card-text"><small class="text-muted">${dataElement[i].release_date}</small></p>
//                         </div>
//                      </div>
//                 </div>
            
//                         `;     
//                     }
//                 };
//                 }