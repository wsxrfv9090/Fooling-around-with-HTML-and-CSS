'use strict';

let button = document.getElementById('userBtn');
let listContainer = document.getElementById('listContainer');

button.addEventListener('mouseover', function () {
    // Clear the list container first
    listContainer.innerHTML = '';

    // Let's create a list of anchors
    let list = document.createElement('ul');

    for (let i = 0; i < 5; i++) {
        let listItem = document.createElement('li');
        let anchor = document.createElement('a');

        // Let's set some dummy href for the anchors
        anchor.href = "#";
        anchor.textContent = "Link " + (i + 1);

        listItem.appendChild(anchor);
        list.appendChild(listItem);
    }

    listContainer.appendChild(list);
});

// Optionally, you can hide the list when the mouse leaves the button
button.addEventListener('mouseout', function () {
    listContainer.innerHTML = '';
});
