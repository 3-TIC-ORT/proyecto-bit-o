let modo = localStorage.getItem("modo");
console.log(modo)
if (modo == "claro"){
    document.body.classList.toggle("claro");
}
let toggle = document.getElementById("cambio-modo");
let logo = document.getElementById("logo")
function toggleMode(){
    document.body.classList.toggle("claro");
        logo.src = logo.src.includes("Logo-bito-chico-blanco.png") 
        ? "../Imagenes/Logo-bito-chico-negro.png" 
        : "../Imagenes/Logo-bito-chico-blanco.png";
        if (document.body.classList.contains("claro")){
            localStorage.setItem("modo", "claro");
        }
        else{
            localStorage.setItem("modo", "oscuro");
        }
}
toggle.addEventListener("click", toggleMode);
let continueButton = document.getElementById("boton-continuar");
function continuar(){
    window.location.href = "../Pantalla-principal/pantalla-principal.html";
}
continueButton.addEventListener("click", continuar);