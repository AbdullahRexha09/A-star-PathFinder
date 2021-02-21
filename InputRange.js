let percentage;
function drag(value){
    document.getElementById("lbltipAddedComment").innerText = value.split('.')[0] + "%";
    let pct = +document.getElementById("range").value;
    percentage = pct / 100;
    localStorage.setItem("perctenge",percentage)
    location.reload();
}
function framepSecond(value){
    document.getElementById("lblFrameSecond").innerText = value + "fps";
    localStorage.setItem("frmprsecond",value);
    
}
function diagonalAllowed(value)
{
    localStorage.setItem("diagonal",value);
}
function generateMaze()
{
    document.getElementById("diagonal").checked = false;
    document.getElementById("lbltipAddedComment").innerText = (localStorage.getItem("perctenge")* 100).toString().split('.')[0] + "%";
    localStorage.setItem("generateMaze",true);
    localStorage.setItem("perctenge",0);
    localStorage.setItem("diagonal",false);
    location.reload();
}
function clearMaze()
{
    localStorage.setItem("generateMaze",false);
    location.reload();

}
function heuristicSelected(value)
{
    localStorage.setItem("heuristic",value);
}
function onInit(){

    document.getElementById("lbltipAddedComment").innerText = (localStorage.getItem("perctenge")* 100).toString().split('.')[0] + "%";
    document.getElementById("range").value = +localStorage.getItem("perctenge") * 100;
    document.getElementById("lblFrameSecond").innerText = localStorage.getItem("frmprsecond") + "fps";
    document.getElementById("fpsrange").value = +localStorage.getItem("frmprsecond");
    document.getElementById("diagonal").checked = localStorage.getItem("diagonal") == "true" ? true : false;
    document.getElementById("heuristic").value = localStorage.getItem("heuristic");
    
}

