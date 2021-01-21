let percentage;
function drag(value){
    document.getElementById("lbltipAddedComment").innerText = value.split('.')[0] + "%";
    let pct = +document.getElementById("range").value;
    percentage = pct / 100;
    localStorage.setItem("perctenge",percentage)
    // location.reload();
    window.top.location = (window.top.location.hostname + window.top.location.pathname);
}
function framepSecond(value){
    document.getElementById("lblFrameSecond").innerText = value + "fps";
    localStorage.setItem("frmprsecond",value);
    
}
function diagonalAllowed(value)
{
    localStorage.setItem("diagonal",value);
    window.top.location = (window.top.location.hostname + window.top.location.pathname);
}
function onInit(){
    document.getElementById("lbltipAddedComment").innerText = (localStorage.getItem("perctenge")* 100).toString().split('.')[0] + "%";
    document.getElementById("range").value = +localStorage.getItem("perctenge") * 100;
    document.getElementById("lblFrameSecond").innerText = localStorage.getItem("frmprsecond") + "fps";
    document.getElementById("fpsrange").value = +localStorage.getItem("frmprsecond");
    document.getElementById("diagonal").checked = localStorage.getItem("diagonal") == "true" ? true : false;
    
}
