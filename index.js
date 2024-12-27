let cells = document.querySelectorAll('.cell');
let restart = document.querySelector('#restart');
let newStatus = document.querySelector('.status');

let winSound = document.querySelector('#win-sound');
let winLine = document.querySelector('#win-line');

let playerx = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (playerx) {
            cell.innerHTML = 'X';
            cell.style.color = 'red';
            newStatus.innerHTML = `Player O's turn`;
            playerx = false;
        } else {
            cell.innerHTML = 'O';
            cell.style.color = 'blue';
            newStatus.innerHTML = `Player X's turn`;
            playerx = true;
        }
        count++;
        cell.disabled = true;
        checkWinner();
    });
});

checkWinner = () => {
    for (let pattern of winPatterns){
        let pattern1= cells[pattern[0]].innerHTML;
        let pattern2= cells[pattern[1]].innerHTML;
        let pattern3= cells[pattern[2]].innerHTML;

        if (pattern1 !== '' && pattern1 === pattern2 && pattern2 === pattern3) {
            disableCells();
            drawWinLine(pattern);
            if (pattern1 === 'X') {
                win('X');
            } else {
                win('O');

            return;
            }
        } else if (count === 9) {
            draw();

        return;
        }
    };
};


restart.addEventListener('click', () => {
    cells.forEach(cell => {
        newStatus.innerHTML = `Player X's turn`;
        newStatus.classList.remove('win', 'tie');
        count = 0;
        playerx = true;
        enableCells();
    });
    winLine.style.transform = 'scaleX(0)'; // Hide the line
});

enableCells = () => {
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.disabled = false;
    });
}

disableCells = () => {
    cells.forEach(cell => {
        cell.disabled = true;
    });
}

win = (player) => {
    newStatus.classList.add('win');
    newStatus.innerHTML = `Player ${player} wins!`;
    winSound.play();
}

draw = () => {
    newStatus.classList.add('tie');
    newStatus.innerHTML = `It's a draw!`;
}

drawWinLine = (pattern) => {
    // Get the bounding rectangles of the start and end cells
    let rect1 = cells[pattern[0]].getBoundingClientRect();
    let rect2 = cells[pattern[2]].getBoundingClientRect();

    // Calculate the start and end coordinates of the line
    let boardRect = document.querySelector('.board').getBoundingClientRect();
    let startX = (rect1.left + rect1.right) / 2 - boardRect.left;
    let startY = (rect1.top + rect1.bottom) / 2 - boardRect.top;
    let endX = (rect2.left + rect2.right) / 2 - boardRect.left;
    let endY = (rect2.top + rect2.bottom) / 2 - boardRect.top;

    // Calculate the angle and length of the line
    let angle = Math.atan2(endY - startY, endX - startX);
    let distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

    // Position and rotate the line
    winLine.style.width = `${distance}px`;
    winLine.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}rad)`;
    winLine.style.transformOrigin = '0 0';
    winLine.style.transition = 'all 0.5s ease-in-out';

    // Make the line visible
    winLine.style.opacity = '1';
};
