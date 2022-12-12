/*const apiURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=259ba00e54afa9d7f417371b4eb03739";

const searchAPI ="https://api.themoviedb.org/3/search/movie?api_key=259ba00e54afa9d7f417371b4eb03739";

const imgPATH = "https://image.tmdb.org/t/p/w500";*/


const movies = document.querySelector(".movies");
const form = document.querySelector("#form");
let zIndex = 0;
let mov = [];
const jsonData = '/static/js/Movies.json';

//recupero dati dal file json
const getData = async()=>{
    try{//risposta
        let response = await fetch(jsonData);
        let data = await response.json();
        console.log(data)
        data.Movies.forEach(m => mov.push(m));
        //appende dal DOM
        renderMovies(mov);
        //seleziona la carta elemento on clicco
        //moviesList()

    }catch(err){
        if(err) console.log(err)
    }
}

//Run funzione
getData()

//Va in loop l'array e prende i valori dentro al DOM
const renderMovies = (arr) =>{
    movies.innerHTML = '';

    for(let i=0; i< arr.length; i++){
        movies.innerHTML += `
         <div class="movie" data-top="${i}">
                  <button class="box"><img src="${arr[i].img}" alt="" class="immagine"></button>
                  <p class="title">${arr[i].name}</p>
              </div>
        `
    }
}

//Seleziona il film

const moviesList = () => {
    let cards = document.querySelectorAll('.movie');

    cards.forEach(c => {
        //incrementa il top margin
        c.style.top = c.dataset.top * 50;
        //aggiunge il margine di destra
        c.style.marginRight = c.dataset.top + 5;
        //aggiunge l'evento click
        c.onclick = ()=>{
            zIndex++

            c.style.zIndex = zIndex;

            c.querySelector('p').style.background = "yellow";
        }
    });
}



//Cerca il film

form.onkeyup = e =>{
    //fa l'evento
    e.preventDefault();
    //input value
    let search = form.search?.value?.toLowerCase();
    // vede l'array
    let results = mov.filter(m => {
        return m.name.toLowerCase().includes(search);
    });

    renderMovies(results);

    moviesList();
}
