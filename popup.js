window.onload = () => {

    const helpButton = document.getElementById("helpButton");
    const helpDiv = document.getElementById("helpDiv");

    helpButton.onclick = help;

    function help() {
        helpButton.onclick = close;
        helpButton.textContent = "Close Help";
        helpDiv.hidden = false;
    }

    function close() {
        helpButton.onclick = help;
        helpButton.textContent = "?";
        helpDiv.hidden = true;
    }
}
