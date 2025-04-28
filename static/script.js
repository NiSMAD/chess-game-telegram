const game = new Chess();

const board = Chessboard('board', {
    draggable: true,
    position: 'start',  // Начальная позиция
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
});

// Обработка перемещения фигур
function onDrop(source, target) {
    const from = algebraicToCoords(source);
    const to = algebraicToCoords(target);

    const legalMoves = game.moves();
    let validMove = false;
    for (let move of legalMoves) {
        if (arraysEqual(move.from, from) && arraysEqual(move.to, to)) {
            validMove = true;
            break;
        }
    }

    if (!validMove) {
        return 'snapback';
    }

    game.move(from, to);
    window.setTimeout(makeBotMove, 500);
}

// После перетаскивания обновляем позицию
function onSnapEnd() {
    board.position(game.fen());
}

// Бот делает случайный ход
function makeBotMove() {
    const moves = game.moves();
    if (moves.length === 0) {
        alert('Игра окончена');
        return;
    }
    const move = moves[Math.floor(Math.random() * moves.length)];
    game.move(move.from, move.to);
    board.position(game.fen());
}

// Вспомогательные функции
function algebraicToCoords(square) {
    const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = 8 - parseInt(square[1]);
    return [rank, file];
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

// Кнопка "Начать заново"
document.getElementById('reset').addEventListener('click', () => {
    window.location.reload();
});
