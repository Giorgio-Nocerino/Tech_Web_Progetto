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

                var cast = '';

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

                        trailer += `<div class="trailer">
                                   <h1>Trailer</h1>
                                   <video controls>
                                       <source src="${movies[i].trailer_mp4}" type="video/mp4">
                                       <source src="${movies[i].trailer_ogg}" type="video/ogg">
                                   </video>
                                </div>`

                        cast += `<button class="precedente" onclick="precedente()"></button>
                                 <div class="actor">
                                    <div class="boxy"><img src="${movies[i].profile1}" alt="" class="image"></div>
                                    <p class="name">${movies[i].name_actor1}</p>
                                 </div>
                                 <div class="actor">
                                    <div class="boxy"><img src="${movies[i].profile2}" alt="" class="image"></div>
                                    <p class="name">${movies[i].name_actor2}</p>
                                 </div>
                                 <div class="actor">
                                    <div class="boxy"><img src="${movies[i].profile3}" alt="" class="image"></div>
                                    <p class="name">${movies[i].name_actor3}</p>
                                 </div>
                                 <div class="actor">
                                    <div class="boxy"><img src="${movies[i].profile4}" alt="" class="image"></div>
                                    <p class="name">${movies[i].name_actor4}</p>
                                 </div>
                                 <div class="actor">
                                    <div class="boxy"><img src="${movies[i].profile5}" alt="" class="image"></div>
                                    <p class="name">${movies[i].name_actor5}</p>
                                 </div>
                                 <button class="successivo" onclick="successivo()"></button>`
                    }
                }

                var result = document.getElementById("heady");

                var res_pp = document.getElementById("flex_section");

                var res_tl = document.getElementById("footer");

                var res_cast = document.getElementById("cast_actors")

                result.innerHTML = item;

                res_pp.innerHTML = photo_plot;

                res_tl.innerHTML = trailer;

                res_cast.innerHTML = cast;

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