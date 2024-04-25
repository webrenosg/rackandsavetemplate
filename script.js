function setupShelf() {
    const shelf = document.getElementById('shelf');
    const width = document.getElementById('shelfWidth').value || 600; // Default width if no input
    const height = document.getElementById('shelfHeight').value || 400; // Default height if no input

    shelf.style.width = `${width}px`;
    shelf.style.height = `${height}px`;
    shelf.innerHTML = ''; // Clear the shelf when new dimensions are set
}

function addCustomBox() {
    const width = parseInt(document.getElementById('boxWidth').value);
    const height = parseInt(document.getElementById('boxHeight').value);
    if (width > 0 && height > 0) {
        addBox(width, height);
    } else {
        alert('Please enter valid dimensions for the box.');
    }
}

function addBox(width, height) {
    const shelf = document.getElementById('shelf');
    const box = document.createElement('div');
    box.className = 'box';
    box.style.width = `${width}px`;
    box.style.height = `${height}px`;
    box.style.left = `0px`; // Start at the top-left corner
    box.style.top = `0px`;
    box.onmousedown = function(event) { startDrag(event, box); };

    shelf.appendChild(box);
}

let selected = null, shiftX = 0, shiftY = 0;

function startDrag(event, element) {
    selected = element;
    shiftX = event.clientX - selected.getBoundingClientRect().left;
    shiftY = event.clientY - selected.getBoundingClientRect().top;

    document.addEventListener('mousemove', moveElem);
    document.addEventListener('mouseup', stopDrag);
}

function moveElem(event) {
    if (!selected) return;

    let newX = event.clientX - shiftX;
    let newY = event.clientY - shiftY;

    // Get the bounds of the shelf
    const shelf = document.getElementById('shelf');
    const maxX = shelf.clientWidth - selected.offsetWidth;
    const maxY = shelf.clientHeight - selected.offsetHeight;

    // Restrict the new position within the bounds
    selected.style.left = `${Math.max(0, Math.min(maxX, newX))}px`;
    selected.style.top = `${Math.max(0, Math.min(maxY, newY))}px`;
}

function stopDrag() {
    selected = null;
    document.removeEventListener('mousemove', moveElem);
    document.removeEventListener('mouseup', stopDrag);
}

document.addEventListener('DOMContentLoaded', setupShelf); // Set default shelf dimensions on load
