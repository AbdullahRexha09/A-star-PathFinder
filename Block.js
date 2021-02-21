function Block(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.previous = undefined;
    this.neighbors = [];
    this.wall = false;
    this.visited = false;
    

    this.clicked = function() {
        
        var d = dist(mouseX, mouseY, this.i * w, this.j * h);
        if ((d < w) && this.i * w < mouseX && this.j * h < mouseY) {
            
            if (!start || !end) {
                if (!start & end != grid[this.i][this.j]) {
                    noStroke();
                    fill(color(0, 255, 0));
                    rect(this.i * w, this.j * h, w - 1, h - 1);
                    start = grid[this.i][this.j];
                    if (openSet) {
                        removeFromArray(openSet, grid[0][0]);
                        openSet.push(start);
                    }

                }
                if (!end & start != grid[this.i][this.j]) {
                    noStroke();
                    fill(color(0, 255, 0));
                    rect(this.i * w, this.j * h, w - 1, h - 1);
                    end = grid[this.i][this.j];

                }

            } else {
                if ((start.i == this.i && start.j == this.j) || (end.i == this.i && end.j == this.j)) {
                    if ((start.i == this.i && start.j == this.j)) {
                        noStroke();
                        fill(255);
                        rect(this.i * w, this.j * h, w - 1, h - 1);
                        start = undefined;
                    } else if (end.i == this.i && end.j == this.j) {
                        noStroke();
                        fill(255);
                        rect(this.i * w, this.j * h, w - 1, h - 1);
                        end = undefined;
                    }
                } else {
                    noStroke();
                    fill(0);
                    rect(this.i * w, this.j * h, w - 1, h - 1);
                    this.wall = true;
                }

            }
        }

    }
    this.show = function(col) {
        fill(col);
        if (this.wall) {
            fill(0);
        }
        strokeWeight(0.5);
        rect(this.i * w, this.j * h, w - 1, h - 1);
    }
    this.addNeighbors = function(grid) {
        var i = this.i;
        var j = this.j;
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1][j - 1]);
        }
        if (i < cols - 1 && j > 0) {
            this.neighbors.push(grid[i + 1][j - 1])
        }
        if (i > 0 && j < rows - 1) {
            this.neighbors.push(grid[i - 1][j + 1]);
        }
        if (i < cols - 1 && j < rows - 1) {
            this.neighbors.push(grid[i + 1][j + 1]);
        }
    

    }

    if (random(1) < localStorage.getItem("perctenge")) {
        this.wall = true;
    }
    
    
}
