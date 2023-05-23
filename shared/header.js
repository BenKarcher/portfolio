const init = [];
function ready() {
    for (let element of document.getElementsByClassName("no-js")) {
        element.classList.remove("no-js");
    }
    let bar = document.getElementById("nav-menu");
    let top_nav = document.getElementById("top-nav-icon");
    let bot_nav = document.getElementById("bot-nav-icon");
    let button = document.getElementById("nav-button");
    button.onclick = function () {
        bar.classList.toggle("open-menu");
        top_nav.classList.toggle("top-nav-icon");
        bot_nav.classList.toggle("bot-nav-icon");
    }

    for (let f of init) {
        f();
    }
}

document.addEventListener("DOMContentLoaded", ready);