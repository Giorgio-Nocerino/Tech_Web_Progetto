const movies = document.querySelector('.movies');
let mov = [];
const jsonData = '/static/js/movies.json';

//recupero dati dal file json
const getData = async()=>{
    try{//risposta
        let response = await fetch(jsonData);
        let data = await response.json();
        console.log(data)
        data.movies.forEach(m => mov.push(m));
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
                  <button class="box" onclick="location.href='${arr[i].url}';"><img src="${arr[i].img}" alt="${arr[i].name}" class="immagine"></button>
                  <p class="title">${arr[i].name}</p>
              </div>
        `
    }
}

//Cerca il film
let input = document.getElementById('search-text'); //barra di ricerca

let button_search = document.getElementById('search-submit'); //invio

let button_menupane = document.getElementById('cerca'); //pulsante cerca

let button_close_menupane = document.getElementById('close_lateral'); //pulsante chiudi

input.addEventListener('input', (e) =>{
    let search = e.target.value.toLowerCase(); //inserisci i valori

    console.log(search); //escono nella console

    e.preventDefault();


    if (search === ''){
        renderMovies(mov); //se cancelli, i film ritornano
        return
    }

    if (e.key === 'Enter' || e.keyCode === 13){ //se premi invio o submit
        //document.getElementById('hamburger-label2').click();
        button_close_menupane.click();
    }


        let results = mov.filter(m => {
        return m.name.toLowerCase().startsWith(search); //escono i film che iniziano quella lettera
    });



    renderMovies(results); //usciranno i risultati

    //moviesList();
})

button_search.onclick = function(e){
    e.preventDefault();
    //document.getElementById('close_lateral').click();
    button_close_menupane.click(); //se clicco si chiude la laterale
}

button_menupane.onclick = function (){ //se clicco il pulsante cerca collega alla variabile anonima e si apre il menu_pane2
    document.getElementById('lateralio').classList.add('is_open');

}

button_close_menupane.onclick = function (){ //se clicco il pulsante X collega alla variabile anonima e si chiude il menu_pane2
    document.getElementById('lateralio').classList.remove('is_open');
}

