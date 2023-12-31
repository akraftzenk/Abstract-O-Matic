/**
 * listener to listen for when to create the sidebar
 */
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.message === "createSidebar") {
        // Add a button to the webpage
        await createSidebar();
    }
});

/**
 * creates the sidebar
 * @returns {Promise<void>}
 */
async function createSidebar() {
    if(document.getElementById("extensionSidebar") !== null){
        document.getElementById("extensionSidebar").innerHTML = "";
    } else {
        let sidebar = document.createElement("div");
        sidebar.id = "extensionSidebar";
        let original_body = document.createElement("div");
        original_body.id = "originalBody";
        original_body.innerHTML = document.body.innerHTML;
        document.body.innerHTML = "";
        document.body.appendChild(sidebar);
        document.body.appendChild(original_body);
    }
    let sidebar = document.getElementById("extensionSidebar");
    await createNumSentencesInput(sidebar);
    createSummarizeButton(sidebar);
    createCloseButton(sidebar);
    sidebar.appendChild(document.createElement("br"));
    createLoadingCircle(sidebar);
    createSummaryTextArea(sidebar);
    createStyle();
}

/**
 * creates the input field
 * @param sidebar
 * @returns {Promise<void>}
 */
async function createNumSentencesInput(sidebar) {
    const numSentencesInputDiv = document.createElement("div");
    numSentencesInputDiv.id = "numSentencesInputDiv";

    const data = await chrome.storage.local.get('Summary_Length');
    let Summary_Length = data.Summary_Length;
    if (isNaN(Summary_Length)) {
        Summary_Length = 10;
    }

    numSentencesInputDiv.innerHTML = `
            <label for="numSentencesExtensionInput" id="numSentencesExtensionLabel">Number of Sentences in the Summary:</label>
            <input type="number" class="form-control" id="numSentencesExtensionInput" value="${Summary_Length}">
            <p></p>
        `;

    sidebar.appendChild(numSentencesInputDiv);
}

/**
 * creates the summarize button
 * @param sidebar
 */
function createSummarizeButton(sidebar){
    const button = document.createElement("button");
    button.textContent = "Summarize";
    button.id = "summarizeButton";

    button.addEventListener("click", async function () {
        await handleSummarize();
    });

    const buttonDiv = document.createElement("div");
    buttonDiv.id = "extensionButtonDiv";
    buttonDiv.appendChild(button);
    sidebar.appendChild(buttonDiv);
}

/**
 * creates a close button
 * @param sidebar
 */
function createCloseButton(sidebar){
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.id = "extensionCloseButton";

    closeButton.addEventListener("click", async function () {
        closeSidebar();
    });

    const buttonDiv = document.getElementById("extensionButtonDiv");
    buttonDiv.appendChild(closeButton);
}

/**
 * creates a loading circle to be shown while waiting for the response from chat gpt
 * @param sidebar
 */
function createLoadingCircle(sidebar){
    let loadingImage = document.createElement('img');
    loadingImage.src = "https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b9522ajy0t8kkn7nj6o8kqb7m5xgwg9fchda667tra6m&ep=v1_gifs_search&rid=200w.gif&ct=g";
    loadingImage.hidden = true;
    loadingImage.id = "abstractloading";

    sidebar.appendChild(loadingImage);
}

/**
 * adds the text area to the webpage
 * @param sidebar
 */
function createSummaryTextArea(sidebar){
    let summaryArea = document.createElement('textarea');
    summaryArea.innerText = "";
    summaryArea.readOnly = true;
    summaryArea.id = "extensionSummaryArea";
    summaryArea.hidden = true;

    const summaryAreaDiv = document.createElement("div");

    summaryAreaDiv.appendChild(summaryArea);
    sidebar.appendChild(summaryAreaDiv);
}

/**
 * add a stylesheet to the webpage
 */
function createStyle(){
    const style = document.createElement("style");
    style.textContent = `
    #originalBody {
        width: 58%;
    }
    
    #extensionSidebar {
        all: initial;
        height: 100%;
        width: 40%;
        position: fixed;
        top: 0;
        right: 0;
        background-color: #FFFFFF;
        border-style: solid;
        padding: 10px;
    }
    
    #extensionSidebar div {
        all: initial;
        width: 100%;
    }
    
    #numSentencesExtensionLabel {
        all: initial;
    }
    
    #numSentencesExtensionInput {
        all: initial;
        border: 1px solid;
    }
    
    #summarizeButton {
        all: initial;
        background-color: #007bff;
        color: #fff;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 10px;
    }
    
    #extensionSummaryArea {
        all: initial;
        width: 100%;
        resize: none;
        height: 100%;
    }
    `;
    document.head.appendChild(style);
}

/**
 * handles a request for to summarize the article
 * @returns {Promise<void>}
 */
async function handleSummarize() {
    if(document.getElementById("extensionSidebar") !== null) {
        let numSentences = parseInt(document.getElementById("numSentencesExtensionInput").value);
        if(isNaN(numSentences)){
            numSentences = 10;
        }
        chrome.storage.local.set({'Summary_Length': numSentences});
        chrome.storage.local.get('GPT_KEY', async function (data) {
            if(document.getElementById("extensionSidebar") !== null) {
                const GPT_KEY = data.GPT_KEY;
                console.log('Retrieved string from storage:', GPT_KEY);
                const articleText = getArticle();
                const prompt = create_prompt(articleText, numSentences);
                console.log(prompt);


                let loadingBar = document.getElementById("abstractloading");
                loadingBar.hidden = false;
                chrome.runtime.sendMessage({
                    action: 'gpt-request',
                    prompt: prompt,
                    gpt_key: GPT_KEY
                }, function (response) {
                    if(document.getElementById("extensionSidebar") !== null) {
                        let loadingBar = document.getElementById("abstractloading");
                        loadingBar.hidden = true;
                        console.log(response);
                       const summaryArea = document.getElementById("extensionSummaryArea");
                       summaryArea.innerText = response;
                       summaryArea.hidden = false;
                    }
                });
            }
        });
    }
}

/**
 * closes the sidebar
 */
function closeSidebar(){
    document.body.innerHTML = document.getElementById("originalBody").innerHTML;
}

/**
 * gets the article text
 * @returns {string} the text of the article
 */
function getArticle() {
    let text;
    text = getTextLayerClass();
    if (text === undefined) {
        text = getBodyMatterId();
    }
    if (text === undefined) {
        text = getArticleTags();
    }
    if (text === undefined) {
        text = getContentClass();
    }
    if (text === undefined) {
        text = document.getElementById("originalBody").innerText;
    }

    return text;
}

// check for class textLayer (firefox pdf viewer and some other sites)
function getTextLayerClass() {
    let elements = document.getElementsByClassName("textLayer");
    if (elements.length === 0) {
        // no text layer :(
        return undefined;
    } else {
        return getLongest(elements).innerText;
    }
}

// get text from bodymatter id
function getBodyMatterId() {
    let bodyMatter = document.getElementById("bodymatter");
    if (bodyMatter) {
        return bodyMatter.innerText;
    } else {
        return undefined;
    }
}

// get text from article tags
function getArticleTags() {
    let elements = document.getElementsByTagName("article");
    if (elements.length === 0) {
        return undefined;
    } else {
        return getLongest(elements).innerText;
    }
}

// get text from content class / content id
function getContentClass() {
    let elements = document.getElementsByClassName("content");
    if (elements.length === 0) {
        return undefined;
    } else {
        return getLongest(elements).innerText;
    }
}

// helper for getting article text
function getLongest(elements) {
    let longestElement = undefined;

    for (let element of elements) {
        if (longestElement === undefined || element.innerText.length > longestElement.innerText.length) {
            longestElement = element;
        }
    }

    return longestElement;
}

// GPT Stuff

/**
 * creates the prompt
 * @param article_text the text of the article
 * @param num_sentences the number of sentences to return
 */
function create_prompt(article_text, num_sentences){
    // let split_article = article_text.split(/[\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/);
    // let filtered = split_article.filter(token => token.length > 0);
    // let max_length = filtered.slice(0, 2000).join(" ").length + split_article.length - filtered.length;
    let truncated_article_text = article_text.slice(0, 10000);//max_length);
    return `In ${num_sentences} sentences, please summarize "${truncated_article_text}"`;
}