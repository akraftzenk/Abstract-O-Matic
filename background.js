function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}

browser.contextMenus.create({
    id: "summarize",
    title: "Summarize Article",
    },
    onCreated,
);

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "summarize":
            console.log("summarize selected");
            break;
    }
});