    console.log("hi");
//creates the ids. This should create a unique id that will hopefully never conflict with any htmlpage's existing IDs.
    let oldContentClass = "oldcontent-abstract";
    let sidebarClass = "sidebar-abstract";


    let sidebar = document.createElement("div");
    sidebar.classList.add(sidebarClass);
    let original_body = document.createElement("div");
    original_body.classList.add(oldContentClass);
    original_body.innerHTML = document.body.innerHTML;
    document.body.innerHTML = "";
    document.body.appendChild(sidebar);
    document.body.appendChild(original_body);


    let summaryArea = document.createElement('textarea');
    summaryArea.innerText = "This is where the output of ChatGPT Will Go.";
    summaryArea.readOnly = true;
    summaryArea.classList.add("summaryArea-Abstract");
    sidebar.appendChild(summaryArea);


    // This code just adds the stylesheet to the page.
    let head = document.getElementsByTagName('HEAD')[0];

    // Create new link Element.
    //let link = document.createElement('link');

// set the attributes for link element
//     link.rel = 'stylesheet';
//
//     link.type = 'text/css';
//
//     link.href = 'styleForSidebar.css';
//idk how to import a stylesheet so this is a temporary thing until i figure it out.
    let style = document.createElement('style');
    style.innerHTML = `
    .sidebar-abstract {
    height: 100%;
    width: 40%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #333;
    padding-top: 20px;
}

.summaryArea-Abstract {
    width: 100%;
    resize: none;
    height: 50%;
}

.oldcontent-abstract {
    width: 55%;
    padding: 20px;
    display: grid;
}




    `
// Append link element to HTML head
    head.appendChild(style);

//say a prayer that this doesn't break the webpage
    console.log("bye");