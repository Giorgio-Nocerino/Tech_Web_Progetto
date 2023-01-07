function ShowCast(codex_movie){
    var cod = codex_movie;
    var xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);

            var cast_carousel = response.cast_carousel;
            var actor = '';

            for(var i=0; i<cast_carousel.length; i++){
                if(cod==cast_carousel[i].codex){
                    actor+=`
                            <button class="precedente" onclick="precedente()"></button>
                            <div class="actor">
                               <div class="boxy"><img src="${cast_carousel[i].profile}" alt="" class="image"></div>
                               <p class="name">${cast_carousel[i].actor}</p>
                            </div>
                            <button class="successivo" onclick="successivo()"></button>`
                }
            }
            var res_cast = document.getElementById("actors");
            res_cast.innerHTML = actor;

        }
    };



    xhttp.open("GET", "/static/js/cast_carousel.json", true);
    xhttp.send();
}

var n_blocks = 5;
var current = 1;

function successivo(){
    current++;
    if(current > n_blocks){
        current = 1;
    }

    for(var i = n_blocks; i > 0; i--){
        document.querySelector(".cast .actors .actor:nth-of-type(" + i + ")").style.display = "none";
    }
    document.querySelector(".cast .actors .actor:nth-of-type(" + current + ")").style.display = "block";
}

function precedente(){
    current--;
    if(current == 0){
        current = n_blocks;
    }

    for(var i = n_blocks; i > 0; i--){
        document.querySelector(".cast .actors .actor:nth-of-type(" + i + ")").style.display = "none";
    }
    document.querySelector(".cast .actors .actor:nth-of-type(" + current + ")").style.display = "block";

    //setInterval(successivo, 10000);
}

