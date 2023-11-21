function onCreated() {
    if (browser.runtime.lastError) {
        alert(`Error: ${browser.runtime.lastError}`);
    } else {
        alert("Item created successfully");
    }
}

browser.menus.create({
    id: "summarize",
    title: "Summarize Article",
    },
    onCreated,
);

browser.menus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "summarize":
            alert("summarize selected");
            break;
    }
});


