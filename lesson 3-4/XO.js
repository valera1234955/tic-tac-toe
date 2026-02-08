document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.querySelector('.game-status');
    const restartButton = document.querySelector('.game-restart');

    let gameActive = true;
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningMessage = () => `Гравець ${currentPlayer} переміг!`;
    const drawMessage = `Нічия!`;
    const currentPlayerTurn = () => `Зараз хід ${currentPlayer}`;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //горизонтальні
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //вертикальні
        [0, 4, 8], [2, 4, 6] //діагоналі
    ];

    function handleCellClick(e) {
        const clickedCell = e.target; //отримуємо клітинку на яку натискаємо
        //отримання індексу по атрибуту, і перетворення його в число
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
        handleCellPlayer(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayer(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }

    function handleResultValidation() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];

            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = winningMessage(); //гравець вийграв
            gameActive = false; //гра зупинилась
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage;
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = currentPlayerTurn();
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];

        statusDisplay.innerHTML = currentPlayerTurn();

        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove('x', 'o');
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', handleRestartGame);

    statusDisplay.innerHTML = currentPlayerTurn();
});