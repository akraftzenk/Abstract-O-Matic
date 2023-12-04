chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.message === "createSidebar") {
        // Add a button to the webpage
        await createSidebar();
    }
});

// Function to add a button to the webpage
async function createSidebar() {
    // if(document.getElementById("extensionSidebar") !== null){
    //     document.getElementById("extensionSidebar").innerHTML = "";
    // } else {
        let sidebar = document.createElement("div");
        sidebar.id = "extensionSidebar";
        let original_body = document.createElement("div");
        original_body.id = "originalBody";
        original_body.innerHTML = document.body.innerHTML;
        document.body.innerHTML = "";
        document.body.appendChild(sidebar);
        document.body.appendChild(original_body);
    // }

    await createNumSentencesInput(sidebar);
    createSummarizeButton(sidebar);
    createSummaryTextArea(sidebar);
    createStyle();
}

async function createNumSentencesInput(sidebar) {
    console.log("hello?");

    const numSentencesInputDiv = document.createElement("div");
    numSentencesInputDiv.id = "numSentencesInputDiv";

    const data = await chrome.storage.local.get('Summary_Length');
    const Summary_Length = data.Summary_Length;

    numSentencesInputDiv.innerHTML = `
            <label for="numSentencesExtensionInput" id="numSentencesExtensionLabel">Number of Sentences in the Summary:</label>
            <input type="number" class="form-control" id="numSentencesExtensionInput" value="${Summary_Length}">
            <p></p>
        `;

    sidebar.appendChild(numSentencesInputDiv);
}

function createSummarizeButton(sidebar){
    const button = document.createElement("button");
    button.textContent = "Click me";
    button.id = "summarizeButton";

    button.addEventListener("click", async function () {
        // Send a message to the system
        await handleSummarize();
    });

    const buttonDiv = document.createElement("div");
    buttonDiv.appendChild(button);
    sidebar.appendChild(buttonDiv);
}

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
    }
    
    #summarizeButton {
        all: initial;
        background-color: #007bff;
        color: #fff;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    #extensionSummaryArea {
        all: initial;
        width: 100%;
        resize: none;
        height: 50%;
    }
    `;
    document.head.appendChild(style);
}

async function handleSummarize() {
    const numSentences = parseInt(document.getElementById("numSentencesExtensionInput").value);
    chrome.storage.local.set({ 'Summary_Length': numSentences });
    chrome.storage.local.get('GPT_KEY', async function (data) {
        const GPT_KEY = data.GPT_KEY;
        console.log('Retrieved string from storage:', GPT_KEY);
        const articleText = getArticle();
        const prompt = create_prompt(articleText, numSentences);
        console.log(prompt);
        // const summaryText = gpt_interaction(prompt, GPT_KEY);
        // console.log(summaryText);
        chrome.runtime.sendMessage({ action: 'gpt-request', prompt: prompt, gpt_key: GPT_KEY}, function(response) {
            console.log(response);
        });
    });
}

function getArticle(){
    return document.getElementById("originalBody").innerText;
}

// GPT Stuff

/**
 * creates the prompt
 * @param article_text the text of the article
 * @param num_sentences the number of sentences to return
 */
function create_prompt(article_text, num_sentences){
    return `Please summarize "${article_text}" in ${num_sentences} sentences`;
}