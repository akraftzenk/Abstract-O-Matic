    console.log("hi");
//creates the ids. This should create a unique id that will hopefully never conflict with any htmlpage's existing IDs.
    let oldContentClass = "oldcontent-abstract";
    let sidebarClass = "sidebar-abstract";

    /*
        Shoutouts to this stackoverflow page?
        https://stackoverflow.com/questions/9284117/inserting-arbitrary-html-into-a-documentfragment
     */
//function fragmentFromString(strHTML) {
    //  return document.createRange().createContextualFragment(strHTML);
//}



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

    /*
    https://youtu.be/k238XpMMn38?si=bXYrCtmF1iU6a3s8&t=68
    The video says it better than I ever could.

     */
    let sidebar = document.createElement("div");
    sidebar.classList.add(sidebarClass);
    const new_body = document.createElement("body");
    new_body.appendChild(sidebar);
    new_body.appendChild(document.body);
    document.body.innerHTML = new_body.innerHTML; //?????
    document.body.classList.add(oldContentClass);

    //my hope is that my code is so awful that I am never allowed to write UI code again.

    let pain = document.createElement('img');
    pain.src = "https://i.imgur.com/CVYjZlsg.jpg";
    sidebar.appendChild(pain);
    //I'm going to commit a war crime so awful it will make Israeli's forces
    //seem like a fucking world peace organization.

    // This code just adds the stylesheet to the page.
    let head = document.getElementsByTagName('HEAD')[0];

    // Create new link Element.
    let link = document.createElement('link');

// set the attributes for link element
    link.rel = 'stylesheet';

    link.type = 'text/css';

    link.href = 'styleForSidebar.css';

// Append link element to HTML head
    head.appendChild(link);

//say a prayer that this doesn't break the webpage
    console.log("bye");