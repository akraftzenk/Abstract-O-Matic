chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.message === "createSidebar") {
        // Add a button to the webpage
        await createSidebar();
    }
});

// Function to add a button to the webpage
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
    createSummaryTextArea(sidebar);
    createStyle();
}

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

function createSummarizeButton(sidebar){
    const button = document.createElement("button");
    button.textContent = "Click me";
    button.id = "summarizeButton";

    button.addEventListener("click", async function () {
        await handleSummarize();
    });

    const buttonDiv = document.createElement("div");
    buttonDiv.id = "extensionButtonDiv";
    buttonDiv.appendChild(button);
    sidebar.appendChild(buttonDiv);
}

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

                chrome.runtime.sendMessage({
                    action: 'gpt-request',
                    prompt: prompt,
                    gpt_key: GPT_KEY
                }, function (response) {
                    if(document.getElementById("extensionSidebar") !== null) {
                        console.log(response);
                        document.getElementById("extensionSummaryArea").innerText = response;
                    }
                });
            }
        });
    }
}

function closeSidebar(){
    document.body.innerHTML = document.getElementById("originalBody").innerHTML;
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
    let split_article = article_text.split(/[\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/);
    let filtered = split_article.filter(token => token.length > 0);
    let max_length = filtered.slice(0, 2000).join(" ").length + split_article.length - filtered.length;
    let truncated_article_text = article_text.slice(0, max_length);
    return `In ${num_sentences} sentences, please summarize "${truncated_article_text}"`;
}