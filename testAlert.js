    console.log("hi");
//creates the ids. This should create a unique id that will hopefully never conflict with any htmlpage's existing IDs.
    let oldContentClass = "oldcontent-abstract";
    let sidebarClass = "sidebar-abstract";


    /*
console.log(document.body);
    let bodyContent = document.getElementsByTagName("body");
    //ugh what is this document fragment things supposed to do and am I using it right?
    let temporaryDoc = document.body.createDocumentFragment();
    //cross our fingers that there is only one body object in the webpage.
    temporaryDoc.appendChild(bodyContent[0].children);
    console.log(bodyContent); //what do you mean no body tags exist?!
    //prepare to throw up
    //document.body.innerHTML = "";

    let bodyChildren = bodyContent.children;
    //bodyChildren.forEach((element) => {element.pop()})
    let oldContent = document.createElement("div");
    oldContent.classList.add(oldContentClass);

    oldContent.appendChild(temporaryDoc);
    //How do I take all the dom elements of the body and put it into a div. is it that hard?!?!?!
    //I think this line is somehow making the webpage blank.
     */


    let sidebar = document.createElement("div");
    sidebar.classList.add(sidebarClass);
    const new_body = document.createElement("body");//no, this can't be a div or else it breaks everything.
    document.body.classList.add(oldContentClass);
    new_body.appendChild(sidebar);
    new_body.appendChild(document.body);
    document.body = new_body; //?!?!?!?! ignore this error its janky but it works.


    let pain = document.createElement('img');
    pain.src = "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg";
    sidebar.appendChild(pain);


    let crying = document.getElementsByTagName('body')
    console.log(crying);
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
    width: 45%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #333;
    padding-top: 20px;
}

.oldcontent-abstract {

    padding: 20px;
    display: grid;
}

body{
    background-color: green;
}
    `
// Append link element to HTML head
    head.appendChild(style);

//say a prayer that this doesn't break the webpage
    console.log("bye");