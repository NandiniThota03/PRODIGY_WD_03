document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    let board = Array(9).fill(null);
    let currentPlayer = 'X';

    const updateStatus = () => {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    };

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return board.includes(null) ? null : 'Tie';
    };

    const handleClick = async (index) => {
        if (!board[index] && !checkWinner()) {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                statusDisplay.textContent = winner === 'Tie' ? 'It\'s a tie!' : `Player ${winner} wins!`;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateStatus();

                if (currentPlayer === 'O') {
                    const aiMove = await getAIMove(board);
                    if (aiMove !== undefined) {
                        board[aiMove] = 'O';
                        cells[aiMove].textContent = 'O';
                        const winner = checkWinner();
                        if (winner) {
                            statusDisplay.textContent = winner === 'Tie' ? 'It\'s a tie!' : `Player ${winner} wins!`;
                        } else {
                            currentPlayer = 'X';
                            updateStatus();
                        }
                    }
                }
            }
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index));
    });

    updateStatus();
});

async function getAIMove(board) {
    try {
        const response = await fetch('http://localhost:3000/ai-move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ board })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.move;
    } catch (error) {
        console.error('Error fetching AI move:', error);
    }
}
