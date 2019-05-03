let grid;
let copyGrid;

function start() {
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    copyGrid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    addNumber();
    addNumber();
    console.table(grid);
    toHtml();
}

function newCopyGrid() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            copyGrid[i][j] = grid[i][j];
        }
    }
}

function checkGrids() {
    let isDifferent = false;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (copyGrid[i][j] != grid[i][j]) {
                isDifferent = true;
                return isDifferent;
            }
        }
    }
    return isDifferent;
}

function addNumber() {
    let randIndexX, randIndexY;
    while (true) {
        randIndexX = Math.floor(Math.random() * 4);
        randIndexY = Math.floor(Math.random() * 4);
        if (grid[randIndexX][randIndexY] == 0) {
            grid[randIndexX][randIndexY] = Math.random() < 0.9 ? 2 : 4;
            return;
        }
    }
}

function getColumn(numberOfColumn) {
    let column = [];
    for (let i = 0; i < 4; i++) {
        column[i] = grid[i][numberOfColumn];
    }
    return column;
}

function setColumn(numberOfColumn, column) {
    for (let i = 0; i < 4; i++) {
        grid[i][numberOfColumn] = column[i];
    }
}


function slide(row) {
    //right
    let n = 4;
    do {
        for (let i = 0; i < n - 1; i++) {
            if (row[i] > 0 && row[i + 1] == 0) {
                row[i + 1] = row[i];
                row[i] = 0;
            }
        }
        n -= 1;
    }
    while (n > 1);
}

function combine(row) {
    for (let i = 3; i >= 1; i--) {
        let a = row[i];
        let b = row[i - 1];
        if (a == b) {
            row[i] = a + b;
            row[i - 1] = 0;
        }
    }
}


function operation(direction) {
    let row = [];
    switch (direction) {
        case 'right':
            for (let i = 0; i < 4; i++) {
                row = grid[i];
                slide(row);
                combine(row);
                slide(row);
                grid[i] = row;
            }
            break;
        case 'left':
            for (let i = 0; i < 4; i++) {
                row = grid[i];
                row.reverse();
                slide(row);
                combine(row);
                slide(row);
                row.reverse();
                grid[i] = row;
            }

            break;
        case 'up':
            for (let i = 0; i < 4; i++) {
                row = getColumn(i);
                row.reverse();
                slide(row);
                combine(row);
                slide(row);
                row.reverse();
                setColumn(i, row)
            }
            break;
        case 'down':
            for (let i = 0; i < 4; i++) {
                row = getColumn(i);
                slide(row);
                combine(row);
                slide(row);
                setColumn(i, row)
            }
            break;
        default:
            console.log("Cos poszlo nie tak!");
    }
}


window.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 37: // Left
            newCopyGrid();
            operation('left');
            console.clear();
            if (checkGrids()) {
                addNumber();
            }
            console.table(grid);
            toHtml();
            break;

        case 38: // Up
            newCopyGrid();
            operation('up');
            console.clear();
            if (checkGrids()) {
                addNumber();
            }
            console.table(grid);
            toHtml();
            break;

        case 39: // Right
            newCopyGrid();
            operation('right');
            console.clear();
            if (checkGrids()) {
                addNumber();
            }
            console.table(grid);
            toHtml();
            break;

        case 40: // Down
            newCopyGrid();
            operation('down');
            console.clear();
            if (checkGrids()) {
                addNumber();
            }
            console.table(grid);
            toHtml();
            break;
    }
}, false);

function dotykRight() {
    newCopyGrid();
    operation('right');
    console.clear();
    if (checkGrids()) {
        addNumber();
    }
    console.table(grid);
    toHtml();
}

function dotykLeft() {
    newCopyGrid();
    operation('left');
    console.clear();
    if (checkGrids()) {
        addNumber();
    }
    console.table(grid);
    toHtml();
}

function dotykUp() {
    newCopyGrid();
    operation('up');
    console.clear();
    if (checkGrids()) {
        addNumber();
    }
    console.table(grid);
    toHtml();
}

function dotykDown() {
    newCopyGrid();
    operation('down');
    console.clear();
    if (checkGrids()) {
        addNumber();
    }
    console.table(grid);
    toHtml();
}

let up = document.getElementById('up');
up.addEventListener('click', dotykUp);
let right = document.getElementById('right');
right.addEventListener('click', dotykRight);
let down = document.getElementById('down');
down.addEventListener('click', dotykDown);
let left = document.getElementById('left');
left.addEventListener('click', dotykLeft);

//funkcja wpisuje liczby do htmla, jest robocza
function toHtml() {
    let counter = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == '0') {
                document.getElementsByClassName('field')[counter].innerHTML = ' ';
                document.getElementsByClassName('field')[counter].style.background = '#CDC1B4'
                document.getElementsByClassName('field')[counter].style.color = '#776E65';
            } else if (grid[i][j] == '2') {
                document.getElementsByClassName('field')[counter].innerHTML = grid[i][j];
                document.getElementsByClassName('field')[counter].style.background = '#EEE4DA'
                document.getElementsByClassName('field')[counter].style.color = '#776E65';
            } else if (grid[i][j] == '4') {
                document.getElementsByClassName('field')[counter].innerHTML = grid[i][j];
                document.getElementsByClassName('field')[counter].style.background = '#EDE0C8'
                document.getElementsByClassName('field')[counter].style.color = '#776E65';
            } else if (grid[i][j] == '8') {
                document.getElementsByClassName('field')[counter].innerHTML = grid[i][j];
                document.getElementsByClassName('field')[counter].style.background = '#F2B179'
                document.getElementsByClassName('field')[counter].style.color = '#FFF';
            } else if (grid[i][j] == '16') {
                document.getElementsByClassName('field')[counter].innerHTML = grid[i][j];
                document.getElementsByClassName('field')[counter].style.background = '#F59563'
                document.getElementsByClassName('field')[counter].style.color = '#FFF';
            } else if (grid[i][j] == '32') {
                document.getElementsByClassName('field')[counter].innerHTML = grid[i][j];
                document.getElementsByClassName('field')[counter].style.background = '#F67C5F'
                document.getElementsByClassName('field')[counter].style.color = '#FFF';
            } else if (grid[i][j] == '64') {
                document.getElementsByClassName('field')[counter].innerHTML = grid[i][j];
                document.getElementsByClassName('field')[counter].style.background = '#F65E3B'
                document.getElementsByClassName('field')[counter].style.color = '#FFF';
            } else if (grid[i][j] == '128') {
                document.getElementsByClassName('field')[counter].innerHTML = grid[i][j];
                document.getElementsByClassName('field')[counter].style.background = '#EDCF72'
                document.getElementsByClassName('field')[counter].style.color = '#FFF';
            } else if (grid[i][j] == '256') {
                document.getElementsByClassName('field')[counter].innerHTML = grid[i][j];
                document.getElementsByClassName('field')[counter].style.background = '#EDCC61'
                document.getElementsByClassName('field')[counter].style.color = '#FFF';
            } else {
                document.getElementsByClassName('field')[counter].innerHTML = grid[i][j];
                document.getElementsByClassName('field')[counter].style.background = '#000'
                document.getElementsByClassName('field')[counter].style.color = '#FFF';

            }
            counter++;
        }
    }
}


// field - 2: #EEE4DA;
// field - 4: #EDE0C8;
// field - 8: #F2B179;
// field - 16: #F59563;
// field - 32: #F67C5F;
// field - 64: #F65E3B;
// field - 128: #EDCF72;
// field - 256: #EDCC61;


function game() {
    start();
    // control();
}
game();