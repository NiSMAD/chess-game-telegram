const game = new Chess();
const board = Chessboard('board', {
    position: game.fen()
});

function randomMove() {
    const moves = game.moves();
    if (moves.length === 0) {
        alert('Игра окончена');
        return;
    }
    const move = moves[Math.floor(Math.random() * moves.length)];
    game.move(move.from, move.to);
    board.position(game.fen());
}

board.position(game.fen());

document.getElementById('reset').addEventListener('click', () => {
    window.location.reload();
});

// Чтобы сделать случайный ход ИИ после каждого хода пользователя
setInterval(randomMove, 3000);
