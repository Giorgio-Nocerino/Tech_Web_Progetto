const result = '/static/js/movies.json';
fetch(result)
    .then(response => {
        return response.json();
    })
    .then(jsondata => console.log(jsondata));
alert(result[0].name);
alert(result[0].codex);
alert(result[1].name);
alert(result[1].codex);