let percentage;
function drag(value){
    debugger;
    document.getElementById("lbltipAddedComment").innerText = value + "%";
    let pct = +document.getElementById("range").value;
    percentage = pct / 100;
    localStorage.setItem("perctenge",percentage)
    location.reload();
}
function onInit(){
    document.getElementById("lbltipAddedComment").innerText = localStorage.getItem("perctenge") * 100 + "%";
    document.getElementById("range").value = +localStorage.getItem("perctenge") * 100;
}
