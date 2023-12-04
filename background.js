// Create a context menu item
chrome.contextMenus.create({
    id: "summarize",
    title: "Summarize Article",
    contexts: ["all"]
});

// Handle click event on the context menu item
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "summarize") {
        // Send a message to content script
        chrome.tabs.sendMessage(tab.id, { message: "createSidebar" });
    }
});

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === 'gpt-request') {
        const summary = await gpt_interaction(request.prompt, request.gpt_key);
        // Send the result back to the content script
        console.log(summary);
        sendResponse({response: summary});
        return summary;
    }
});

let GPT_URL = "https://api.openai.com/v1/chat/completions";

/**
 * interacts with ChatGPT
 * @param request the request to ChatGPT
 * @param gptKey the key to interact with ChatGPT
 * @returns {Promise<*>}
 */
async function gpt_interaction(request, gptKey) {
    let response = await fetch(GPT_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + gptKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": request}],
            "temperature": 0.7
        })
    });
    let data = await response.json();
    console.log(data);
    return data.choices[0].message.content;
}