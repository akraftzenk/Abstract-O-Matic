let GPT_URL = "https://api.openai.com/v1/chat/completions";

/**
 * interacts with chat gpt
 * @param request the request to chat-gpt
 * @returns {Promise<*>}
 */
async function gpt_interaction(request) {
    let value = await browser.storage.local.get("gptKey");

    if (typeof value === 'undefined' && typeof value.gptKey === 'undefined'){
        throw new Error("There is no GPT-Key!");
    }

    let response = await fetch(GPT_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + value.gptKey,
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

/**
 * creates the prompt
 * @param article_text the text of the article
 * @param num_sentences the number of sentences to return
 */
function create_prompt(article_text, num_sentences){
    return `summarize "${article_text}" in ${num_sentences} sentences`;
}