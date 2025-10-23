connect2Server();
let modo = localStorage.getItem("modo");
let toggle = document.getElementById("cambio-modo");
let logo = document.getElementById("logo");
const flechaUp = document.getElementById("flechaUp");
const flechaRight = document.getElementById("flechaRight");
const flechaDown = document.getElementById("flechaDown");
const flechaLeft = document.getElementById("flechaLeft");
const flechaL = document.getElementById("flechaL");
const alertaDown = document.getElementById("alertaDown");
const alertaUp = document.getElementById("alertaUp");
const alertaLeft = document.getElementById("alertaLeft");
const alertaRight = document.getElementById("alertaRight");
console.log(modo);
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
    if (event.repeat) return;
    if (event.key === "l" || event.key === "L") {
      console.log("Se presionó la letra L");
      postEvent("teclaLOn", {msg: `${event.key}On`});
      flechaL.src = "../Imagenes/Tecla-l-clara.png";
    }

    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
      console.log("Se presionó la flecha ↑");
      postEvent("teclaUpOn", {msg: `${event.key}On`});
      flechaUp.src = "../Imagenes/Tecla-flecha-arriba-clara.png";
    }

    if (event.key === "ArrowDown") {
      console.log("Se presionó la flecha ↓");
      postEvent("teclaDownOn", {msg: `${event.key}On`});
      flechaDown.src = "../Imagenes/Tecla-flecha-abajo-clara.png";
    }

    if (event.key === "ArrowLeft") {
      console.log("Se presionó la flecha ←");
      postEvent("teclaLeftOn", {msg: `${event.key}On`});
      flechaLeft.src = "../Imagenes/Tecla-flecha-izquierda-clara.png";
    }

    if (event.key === "ArrowRight") {
      console.log("Se presionó la flecha →");
      postEvent("teclaRightOn", {msg: `${event.key}On`});
      flechaRight.src = "../Imagenes/Tecla-flecha-derecha-clara.png";
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.key === "l" || event.key === "L") {
      console.log("Se soltó la letra L");
      postEvent("teclaLOff", { msg: `${event.key}Off` });
      flechaL.src = "../Imagenes/Tecla-l.png";
    }
  
    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
      console.log("Se soltó la flecha ↑");
      postEvent("teclaUpOff", { msg: `${event.key}Off` });
      flechaUp.src = "../Imagenes/Tecla-flecha-arriba.png";
    }
  
    if (event.key === "ArrowDown") {
      console.log("Se soltó la flecha ↓");
      postEvent("teclaDownOff", { msg: `${event.key}Off` });
      flechaDown.src = "../Imagenes/Tecla-flecha-abajo.png";
    }
  
    if (event.key === "ArrowLeft") {
      console.log("Se soltó la flecha ←");
      postEvent("teclaLeftOff", { msg: `${event.key}Off` });
      flechaLeft.src = "../Imagenes/Tecla-flecha-izquierda.png";
    }
  
    if (event.key === "ArrowRight") {
      console.log("Se soltó la flecha →");
      postEvent("teclaRightOff", { msg: `${event.key}Off` });
      flechaRight.src = "../Imagenes/Tecla-flecha-derecha.png";
    }
  });

  function LDR(msg){
    console.log(msg);
    if (msg == "LDR:ON"){
      //Hacer cosas si esta ON
    }
    else if (msg == "LDR:OFF"){
      //Hacer cosas si esta OFF
    }
  }
    function US(msg){
      console.log(msg);
      if (msg == "US:ON"){
        alertaUp.style.display = "block";
        alertaDown.style.display = "block";
        alertaLeft.style.display = "block";
        alertaRight.style.display = "block";
      }
      else if (msg == "US:OFF"){
        alertaUp.style.display = "none";
        alertaDown.style.display = "none";
        alertaLeft.style.display = "none";
        alertaRight.style.display = "none";
      }
  }
  subscribeRealTimeEvent("LDR", LDR);
  subscribeRealTimeEvent("US", US);