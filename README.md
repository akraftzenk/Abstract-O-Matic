# Abstract-O-Matic

The Abstract-o-Matic is a browser extension that is meant to help simplify scientific articles and make them easier to understand. 

---
It should run on webpages like wikipedia. We didn't get it to work on pdfs


How to run the extension.

---
## Chrome:
- Type "chrome://extensions" into your browser
- Enable developer mode in the top right corner
- Click on Load unpacked in the top left
- Select the extension folder

---
## Firefox:
- Type "about:addons" into your browser
- Click the settings icon in the top right and select "Debug Add-ons"
- Click on Load Temporary Add-on
- Select the manifest.json file

---
## After Install:
- Click the extension icon in the top right (looks like puzzle piece)
- Enter the gpt key
  - The GPT API Key is in a text file in the zip folder

---
## Running:
- To run the program go to an article you want to summarize
- Right click and select summarize article.
- Enter the number of sentences to request for summary size

---
## What features are available?
- Summarize whole article (limited to first ~1500 words of article)
  - The user can summarize a whole article by right clicking on a page and selecting "Summarize Article"
  - A sidebar will open where the user can choose a preferred response length by number of sentences.
  - Clicking "Summarize" will send a request to get a summarized version of the first ~1500 words of the current website's main content
  - Clicking "Close" will close the sidebar.
- User Preferences (GPT Key and response length)
  - When summarizing an article, when the user changes the response length, the number will be saved and used by default in succeeding sessions.
  - When changing the GPT-Key in the extension's popup menu, the key will be saved and used by default in succeeding sessions.
- "Help" Menu
  - The user can open a help menu that can be opened by clicking the extension icon at the top right corner
  - The menu briefly describes how to use the extension
  - The user can enter a GPT key in a text-field that will be saved between sessions