function ShowDetails(movies){

    var genreSelected = movies;

    var  xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);


            var movies = response.movies;

            var item = '';

            var photo_plot = '';

            var trailer = '';

            for (var i = 0; i < movies.length; i++) {

                console.log(movies);

                if (genreSelected == movies[i].codex) {

                    item += `<h2 class="title">${movies[i].name}</h2>`

                    photo_plot += `<nav class="photo">
                                     <img src="${movies[i].img}" alt="${movies[i].name}" id="henko">
                                   </nav>

                                   <article>
                                     <h1>Trama</h1>
                                     <p class="plot">${movies[i].plot}</p>
                                   </article>`

                    trailer += `<h1>Cast</h1>
                                <div class="trailer"></div>`
                }
            }

            var result = document.getElementById("heady");

            var res_pp = document.getElementById("section");

            var res_tl = document.getElementById("")

            result.innerHTML = item;

            res_pp.innerHTML = photo_plot;

        }
    };

    xhttp.open("GET", "/static/js/movies.json", true);
    xhttp.send();

}


let button_movies = document.getElementsByClassName('movie'); //pulsante film

let button_close_movies = document.getElementsByClassName('return_back');

  for (let i=0; i<button_movies.length; i++){
       button_movies[i].onclick = function () { //se clicco il film, collega alla variabile anonima e si apre il menu4
           document.getElementById('details').classList.add('is_open3');
       }
  }

for (let i=0; i<button_close_movies.length; i++){
    button_close_movies[i].onclick = function () { //se clicco il film, collega alla variabile anonima e si apre il menu4
        document.getElementById('details').classList.remove('is_open3');
    }
}