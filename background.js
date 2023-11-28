function onCreated() {
    if (chrome.runtime.lastError) {
        console.log(`Error: ${chrome.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}

chrome.contextMenus.create({
    id: "summarize",
    title: "Summarize Article",
    },
    onCreated,
);

chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "summarize":
            chrome.tabs.executeScript({
                //code: `alert("summarize selected");`,
                file: `testAlert.js`,
            });
            break;
    }
});


