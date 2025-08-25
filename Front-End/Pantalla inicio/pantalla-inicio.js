let continueButton = document.getElementById("boton-continuar");
function continuar(){
    window.location.href = "../Tutorial/tutorial.html";
}
continueButton.addEventListener("click", continuar);
let toggle = document.getElementById("cambio-modo");
let logo = document.getElementById("logo");
function toggleMode(){
    let body = document.getElementById("body");
    body.classList.toggle("claro");
    logo.src = logo.src.includes("Logo-modo-oscuro.png") 
        ? "../Imagenes/Logo-modo-claro.png" 
        : "../Imagenes/Logo-modo-oscuro.png";
        if (body.classList.contains("claro")){
            localStorage.setItem("modo", "claro");
        }
        else{
            localStorage.setItem("modo", "oscuro");
        }
}
toggle.addEventListener("click", toggleMode);

