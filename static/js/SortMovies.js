function sort() {
    var sortMovie, i, switching, b, shouldSwitch;
    sortMovie = document.getElementById("alpha_movies");
    switching = true;
    while (switching) {
        switching = false;
        b = sortMovie.getElementsByTagName("div");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}