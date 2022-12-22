const alfabetic_buttons = document.querySelector('.later');
let ab = [];
const jsonFile = '/static/js/alfabetic_buttons.json';

//recupero dati dal file json
const getFile = async()=>{
    try{//risposta
        let response = await fetch(jsonFile);
        let data = await response.json();
        console.log(data)
        data.alfabetic_buttons.forEach(a => ab.push(a));
        //appende dal DOM
        renderButtons(ab);
        //seleziona la carta elemento on clicco
        //moviesList()

    }catch(err){
        if(err) console.log(err);
    }
}

//Run funzione
getFile()

//Va in loop l'array e prende i valori dentro al DOM
const renderButtons = (arr) =>{
    alfabetic_buttons.innerHTML = '';

    for(let i=0; i< arr.length; i++){
        alfabetic_buttons.innerHTML += `
         <div class="ab_button" data-top="${i}">
                  <button class="aButton"><p class="letButton">${arr[i].letter}</p></button>
         </div>
        `
    }
}


let button_laterButtons = document.getElementById('AZ'); //pulsante film a-z

button_laterButtons.onclick = function (){ //se clicco il pulsante film a-z, collega alla variabile anonima e si apre il menu3
    document.getElementById('right_lateral').classList.add('is_open2');

}
