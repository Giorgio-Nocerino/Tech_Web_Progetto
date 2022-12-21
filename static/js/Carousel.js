var n_blocks = 32;
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