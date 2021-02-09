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
    
    var height = $(window).height() - $(window).height() / 5;
    let cnv = createCanvas(height, height);
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
    if(localStorage.getItem("generateMaze") == "true")
    {
    drawMaze(grid);   
    }
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];


    start.wall = false;
    end.wall = false;

    openSet.push(start);
}
// function windowResized() {
//     var height = $(window).height() - 100;
//     resizeCanvas(height, height);
//   }

function draw() {
    frameRate(+localStorage.getItem("frmprsecond"));
    var isDiagonalAllowed = localStorage.getItem("diagonal") == "true"
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
                noLoop();
                console.log("DOne");               

            }
            removeFromArray(openSet, current);
            closedSet.push(current);
            var neighbors = current.neighbors;
            for (var i = 0; i < neighbors.length; i++) {
                if(!isDiagonalAllowed)
                {
                    if(neighbors[i].i != current.i && neighbors[i].j != current.j){
                        break;
                    }
                }
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
            bootbox.alert({
                message:"No solution",
                backdrop: true
            });
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
            path[i].show(color(0, 0, 255)); //yellow
        }
        noFill(255,255,0);
        stroke(255);
        beginShape();
        for(var i = 0;i < path.length;i++){
            vertex(path[i].i * w + w / 2,path[i].j * h + h /2)
        }
        endShape();

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
    var value = localStorage.getItem("heuristic");
    if(value === "euclidean")
    {
    var d = dist(a.i, a.j, b.i, b.j);
    }
    else if(value === "manhattan")
    {
        var d = abs(a.i - b.i) + abs(a.j - b.j);
    }
    return d;
}

function mouseDragged() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].clicked();
        }
    }
}
function mouseClicked() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].clicked();
        }
    }
}

function start1() {
    startPathFinder = true;
}
function reload(){
    location.reload();
}



