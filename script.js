const gridItems = document.querySelectorAll('.grid-item');
const resetGameButton = document.querySelector('#reset-game-button')
resetGameButton.style.backgroundColor = 'grey';

const hideImages = () => {
    gridItems.forEach(item => {
        const img = item.querySelector('img');
        img.style.display = 'none';
    });
}

const shufflePosition = () => {
    let arr = Array.from(gridItems);
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const gridContainer = document.querySelector('.grid-container');
    arr.forEach(item => {
        gridContainer.appendChild(item);
    });
};

shufflePosition();
hideImages();

let gameWin = false;
let clickCount = 0;
let ship = 0;
const message = document.createElement('p');

gridItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img.style.display !== 'none' || gameWin) return;
        resetGameButton.style.backgroundColor = 'violet';

        if (clickCount < 8) {
            clickCount++;
            if (item.id === "ship") {
                ship++;
                if (ship === 5) {
                    if (message.textContent.length === 0) {
                        message.textContent = 'You won! Press play again to try again';
                        document.body.appendChild(message);
                        gameWin = true;
                    }
                }
            }
            img.style.display = 'block';
            if (clickCount == 8) {
                if (message.textContent.length === 0) {
                    message.textContent = 'You lost! Press play again to try again';
                    document.body.appendChild(message);
                }
            }
        }
    });
});

resetGameButton.addEventListener('click', () => {
    clickCount = 0;
    ship = 0;
    hideImages();
    shufflePosition();
    resetGameButton.style.backgroundColor = 'grey';
    message.textContent = '';
    gameWin = false;
})
