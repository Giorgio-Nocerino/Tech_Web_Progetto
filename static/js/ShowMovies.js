function genreClick(movies){

    var genreSelected = movies;

    var  xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(xhttp.responseText);



            var movies = response.movies;

            var item = '';

            for(var i = 0; i < movies.length; i++){

                if(genreSelected == movies[i].codex){

                    item += `<h2 class="title">${movies[i].name}</h2>
                `
                }
            }

            document.getElementById('heady').innerHTML = item;

        }
    };

    xhttp.open("GET", "/static/js/movies.json", true);
    xhttp.send();

}