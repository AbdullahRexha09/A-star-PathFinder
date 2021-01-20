var cols = 25;
var rows = 25;

var openSet = [];
var closedSet = [];

var start;
var end;
var w, h;
var path = [];
var noSolution = false;
var startPathFinder = false;
var shouldDrawGrid = true;

var grid = new Array(cols);

//

function setup() {
    let cnv = createCanvas(500, 500);
    cnv.parent('sketch-holder')
    console.log('A*');

    w = width / cols;
    h = height / rows;

    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Block(i, j);
        }
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    start.wall = false;
    end.wall = false;

    openSet.push(start);
}

function draw() {
    frameRate(+localStorage.getItem("frmprsecond"));
    if (shouldDrawGrid) {
        background(0);
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                grid[i][j].show(color(255));
            }
        }
    }
    shouldDrawGrid = false;

    if (start) {
        start.show(color(0, 255, 0));
    }
    if (end) {
        end.show(color(0, 0, 255));
    }

    if (startPathFinder) {
        if (openSet.length > 0) {
            var winner = 0;
            for (var i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[winner].f) {
                    winner = i;
                }
            }
            var current = openSet[winner];

            if (current === end) {
                var temp = current;
                // path.push(temp);
                // while(temp.previous){
                //     path.push(temp.previous);
                //     temp = temp.previous;
                // }
                noLoop();
                console.log("DOne");

            }
            removeFromArray(openSet, current);
            closedSet.push(current);

            var neighbors = current.neighbors;
            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];
                if (!closedSet.includes(neighbor) && !neighbor.wall) {
                    // var tempG = current.g + 1;
                    var tempG = current.g + heuristic(current,neighbor);

                    var newPath = false;
                    if (openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;
                            newPath = true;
                        }
                    } else {
                        neighbor.g = tempG;
                        newPath = true;
                        openSet.push(neighbor);
                    }
                    if (newPath) {
                        neighbor.h = heuristic(neighbor, end);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.previous = current;
                    }
                }
            }
        } else {
            console.log("No Solution");
            noLoop();
            return;
        }


        for (var i = 0; i < openSet.length; i++) {
            openSet[i].show(color(0, 255, 0)); //green
        }
        for (var i = 0; i < closedSet.length; i++) {
            closedSet[i].show(color(255, 0, 0)); //red
        }
        path = [];
        var temp = current;
        path.push(temp);
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }

        for (var i = 0; i < path.length; i++) {
            path[i].show(color(0, 0, 255)); //blue
        }
    }
}

function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    // var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
}

function mousePressed() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].clicked();
        }
    }
}

function start1() {
    startPathFinder = true;
    bootbox.alert("Your message here");
}
function reload(){
    location.reload();
}