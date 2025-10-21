let modo = localStorage.getItem("modo");
let toggle = document.getElementById("cambio-modo");
let logo = document.getElementById("logo")
console.log(modo)
if (modo == "claro"){
    document.body.classList.toggle("claro");
    logo.src = "../Imagenes/Logo-bito-chico-negro.png";
}
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
document.addEventListener("keydown", function(event) {

    if (event.key === "l" || event.key === "L") {
      console.log("Se presionó la letra L");
      postEvent("teclaL", {msg: event.key});
    }

    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
      console.log("Se presionó la flecha ↑");
      postEvent("teclaUp", {msg: event.key});
    }

    if (event.key === "ArrowDown") {
      console.log("Se presionó la flecha ↓");
      postEvent("teclaDown", {msg: event.key});
    }

    if (event.key === "ArrowLeft") {
      console.log("Se presionó la flecha ←");
      postEvent("teclaLeft", {msg: event.key});
    }

    if (event.key === "ArrowRight") {
      console.log("Se presionó la flecha →");
      postEvent("teclaRight", {msg: event.key});
    }
  });
  connect2Server();