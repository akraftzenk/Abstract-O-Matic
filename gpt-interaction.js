let GPT_URL = "https://api.openai.com/v1/chat/completions";
let GPT_AUTHORIZATION_TOKEN = "";

/**
 * interacts with chat gpt
 * @param request the request to chat-gpt
 * @returns {Promise<*>}
 */
async function gpt_interaction(request) {
    let response = await fetch(GPT_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + GPT_AUTHORIZATION_TOKEN,
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
 */
function create_prompt(article_text){

}