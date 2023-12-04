window.onload = () => {
    const gptKeyInput = document.getElementById("gptKey");

    gptKeyInput.onchange = (event) => {
        const gptKeyValue = gptKeyInput.value;
        chrome.storage.local.set({ 'GPT_KEY': gptKeyValue }, function() {
            console.log('String saved:', inputText);
            window.close(); // Close the popup after saving
        });
    }
}

/*
window.onload = () => {

    //const helpButton = document.getElementById("helpButton");
    //const helpDiv = document.getElementById("helpDiv");

    const gptKeyInput = document.getElementById("gptKey");
    const responseLengthPreferenceInput = document.getElementById("responseLengthPreference");
    const responseLengthPreferenceDisplay = document.getElementById("responseLengthPreferenceDisplay")

    gptKeyInput.onkeydown = (event) => {
        if (event.key === "Enter") {
            gptKeyInput.blur();
        }
    }

    //adjust response length
    function setResponseLengthPreference(newValue) {
        browser.storage.local.set({
                responseLength: newValue
        });
    }

    function setGPTKeyPreference(newValue) {
        browser.storage.local.set({
            gptKey: newValue
        });
    }

    function updateResponseLengthDisplay() {
        responseLengthPreferenceDisplay.textContent = responseLengthPreferenceInput.value.toString();
    }

    responseLengthPreferenceInput.oninput = () => {
        updateResponseLengthDisplay();
    }

    responseLengthPreferenceInput.onchange = () => {
        setResponseLengthPreference(responseLengthPreferenceInput.value);
    }

    gptKeyInput.onchange = () => {
        setGPTKeyPreference(gptKeyInput.value);
    }

    browser.storage.local.get("responseLength").then((value) => {
        if (typeof value !== 'undefined' && typeof value.responseLength !== 'undefined') {
            responseLengthPreferenceInput.value = value.responseLength;
            updateResponseLengthDisplay();
        }
    });

    browser.storage.local.get("gptKey").then((value) => {
        if (typeof value !== 'undefined' && typeof value.gptKey !== 'undefined'){
            gptKeyInput.value = value.gptKey;
        }
    })

}
*/