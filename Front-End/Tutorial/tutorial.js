let modo = localStorage.getItem("modo");
console.log(modo)
if (modo == "claro"){
    document.body.classList.toggle("claro");
}
let toggle = document.getElementById("cambio-modo");
function toggleMode(){
    document.body.classList.toggle("claro");
}
toggle.addEventListener("click", toggleMode);