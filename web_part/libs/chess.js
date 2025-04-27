(function() {
    'use strict';

    window.Chess = function() {
        const board = Array(8).fill().map(() => Array(8).fill(null));
        let turn = 'w'; // 'w' or 'b'

        function init() {
            const pieces = [
                ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
                ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
            ];
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    board[r][c] = pieces[r][c];
                }
            }
        }

        function generateMoves() {
            // Для упрощения: возвращаем случайные ходы пешек
            const moves = [];
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const piece = board[r][c];
                    if (!piece) continue;
                    const isWhite = piece === piece.toUpperCase();
                    if ((turn === 'w' && isWhite) || (turn === 'b' && !isWhite)) {
                        if (piece.toLowerCase() === 'p') {
                            const dir = isWhite ? -1 : 1;
                            if (board[r + dir] && !board[r + dir][c]) {
                                moves.push({
                                    from: [r, c],
                                    to: [r + dir, c]
                                });
                            }
                        }
                    }
                }
            }
            return moves;
        }

        function move(from, to) {
            const [fr, fc] = from;
            const [tr, tc] = to;
            board[tr][tc] = board[fr][fc];
            board[fr][fc] = null;
            turn = (turn === 'w') ? 'b' : 'w';
        }

        function fen() {
            let result = '';
            for (let r = 0; r < 8; r++) {
                let empty = 0;
                for (let c = 0; c < 8; c++) {
                    const piece = board[r][c];
                    if (piece) {
                        if (empty > 0) {
                            result += empty;
                            empty = 0;
                        }
                        result += piece;
                    } else {
                        empty++;
                    }
                }
                if (empty > 0) result += empty;
                if (r !== 7) result += '/';
            }
            result += ' ' + turn + ' - - 0 1';
            return result;
        }

        init();

        return {
            moves: generateMoves,
            move: move,
            fen: fen
        };
    };
})();
