function drawMaze(board)
{
    for (var i = 0; i < cols; i+=2) {
        for (var j = 0; j < rows; j++) {
            board[i][j].wall = true;
        }
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j+=2) {
            board[i][j].wall = true;
        }
    }
    let sy = 1;
    let sx = 1;
    // Allow maze solve, without diagonal allowed
    board[0][1].wall = false;
    board[1][0].wall = false;
    board[cols - 2][rows - 1].wall = false;
    board[cols - 1][rows - 2].wall = false;
    /////
    board[sy][sx].visited = true;
    let stack = [];
    stack.push( { x: sx, y: sy } );

    while (stack.length > 0) {
        let current = stack.pop();

        let validNeighbors = [];
        let straightMoves = [[0, -2], [0, 2], [-2, 0], [2, 0]];

        for (let move of straightMoves) {
            let newNodePosition = {
                x: current.x + move[0],
                y: current.y + move[1]
            };

            if (!isOnBoard(newNodePosition) || board[newNodePosition.y][newNodePosition.x].visited) {
                continue;
            }

            validNeighbors.push(newNodePosition);
        }
        if (validNeighbors.length > 0) {
            stack.push(current);
            let randNeighbor = random(validNeighbors);

            if (randNeighbor.y === current.y) { 
                if (randNeighbor.x > current.x) {
                    board[current.y][current.x + 1].wall = false;
                } else {
                    board[current.y][current.x - 1].wall = false;
                }
            } else {
                if (randNeighbor.y > current.y) {
                    board[current.y + 1][current.x].wall = false;
                } else {
                    board[current.y - 1][current.x].wall = false;
                }
            }

            board[randNeighbor.y][randNeighbor.x].visited = true;
            stack.push(randNeighbor);

}
function isOnBoard(nodePosition) {
    return !(nodePosition.y > (rows - 1) ||
        nodePosition.y < 0 ||
        nodePosition.x > (cols  - 1) ||
        nodePosition.x < 0);
}
}
}
