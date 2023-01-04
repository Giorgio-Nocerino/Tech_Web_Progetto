
const fav_movies = document.querySelector('.fav_movies');
let fav_mov = [];
const jsonWishList = '/static/js/fav_movies.json';

const getWishList = async() =>{
    try{
        let response = await fetch(jsonWishList);
        let data = await response.json();
        console.log(data);
        data.fav_movies.forEach(fm => fav_mov.push(fm));
        renderWishList(fav_mov);
    }catch (err){
        if(err) console.log(err);
    }
}

getWishList()


const renderWishList = (arr) =>{
    fav_movies.innerHTML='';

    for(let i=0; i<arr.length; i++){
        fav_movies.innerHTML += `
        <div class="card">
             <div class="movie" data-top="${i}">
                  <button class="box" id="${arr[i].codex}" onclick="ShowDetails(this.id)">
                      <img src="${arr[i].img}" alt="${arr[i].name}" class="immagine">
                      <p class="title">${arr[i].name}</p>
                  </button>
                   
             </div>
             <div class="fav_bin">
                 <button class="fav_bin_btn" id="${arr[i].codex}" onclick="RemoveMovies(this.id)"><img src="/static/images/bin.png"></button>
             </div>
         </div>
        `
    }
}



