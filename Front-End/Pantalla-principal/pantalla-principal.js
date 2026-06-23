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
const luzAdelante = document.getElementById("luzAdelante");
const luzAtras = document.getElementById("luzAtras");
const containerBusqueda = document.getElementById("containerBusqueda");
const busqueda = document.getElementById("busqueda");
const giroIzq = document.getElementById("izquierdaGiro");
const giroDer = document.getElementById("derechaGiro");
let lucesEncendidas = false;
let controlManual = false;

import {fiesta} from "./fiesta.js";

const colors = ["AMARILLO", "ROJO", "AZUL", "VERDE", "VIOLETA", "BLANCO", "CELESTE"];

const colores = {
  "AMARILLO": "#FFE600",
  "ROJO":     "#FF0000",
  "AZUL":     "#0033FF",
  "VERDE":    "#00CC00",
  "VIOLETA":  "#8800FF",
  "BLANCO":   "#FFFFFF",
  "CELESTE":  "#00CCFF"
};

let currentColorIndex = 0;
let currentColor = colors[0];

function applyColorToLights() {
  luzAdelante.style.color = colores[currentColor];
  luzAtras.style.color = colores[currentColor];
}

function cycleColor() {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  currentColor = colors[currentColorIndex];
  applyColorToLights();
}
luzAdelante.addEventListener("click", cycleColor);
luzAtras.addEventListener("click", cycleColor);
console.log(modo);
if (modo === "claro"){
    document.body.classList.add("claro");
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
      if (flechaL) flechaL.src = "../Imagenes/Tecla-l-clara.png";
      lucesEncendidas = !lucesEncendidas;
      controlManual = true;
      cambiarLuz();
    }
    function cambiarLuz(){
      if (lucesEncendidas) {
        luzAdelante.style.display = "block";
        luzAtras.style.display = "block";
        applyColorToLights();
        postEvent("teclaL", {msg: currentColor});
      } else {
        luzAdelante.style.display = "none";
        luzAtras.style.display = "none";
        postEvent("teclaL", {msg: "APAGAR"});
      }
    }
    luzAdelante.addEventListener("click", cambiarLuz);
    luzAtras.addEventListener("click", cambiarLuz);
    logo.addEventListener("click", () => fiesta(lucesEncendidas, () => {
      lucesEncendidas = false;
    }));
    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
      console.log("Se presionó la flecha ↑");
      postEvent("teclaUpOn", {msg: `${event.key}On`});
    }

    if (event.key === "ArrowDown") {
      console.log("Se presionó la flecha ↓");
      postEvent("teclaDownOn", {msg: `${event.key}On`});
    }

    if (event.key === "ArrowLeft") {
      console.log("Se presionó la flecha ←");
      postEvent("teclaLeftOn", {msg: `${event.key}On`});
      giroIzq.style.display = "block";
    }

    if (event.key === "ArrowRight") {
      console.log("Se presionó la flecha →");
      postEvent("teclaRightOn", {msg: `${event.key}On`});
      giroDer.style.display = "block";
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.key === "l" || event.key === "L") {
      console.log("Se soltó la letra L");
      if (flechaL) flechaL.src = "../Imagenes/Tecla-l.png";
    }
  
    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
      console.log("Se soltó la flecha ↑");
      postEvent("teclaUpOff", { msg: `${event.key}Off`});
    }
  
    if (event.key === "ArrowDown") {
      console.log("Se soltó la flecha ↓");
      postEvent("teclaDownOff", { msg: `${event.key}Off` });
    }
  
    if (event.key === "ArrowLeft") {
      console.log("Se soltó la flecha ←");
      postEvent("teclaLeftOff", { msg: `${event.key}Off` });
      giroIzq.style.display = "none";
    }
  
    if (event.key === "ArrowRight") {
      console.log("Se soltó la flecha →");
      postEvent("teclaRightOff", { msg: `${event.key}Off` });
      giroDer.style.display = "none";
    }
  });

  function LDR(msg){
    console.log(msg.msg);
      if (msg.msg == "LDR:ON") {
    luzAtras.style.display = "block";
    luzAdelante.style.display = "block";
    applyColorToLights();
    lucesEncendidas = true;
  }
  else if (msg.msg == "LDR:OFF") {
    // Solo apaga si el usuario NO tomó control manual
    if (!controlManual) {
      luzAtras.style.display = "none";
      luzAdelante.style.display = "none";
      lucesEncendidas = false;
    } 
    else {
      console.log("LDR:OFF ignorado (luces forzadas por el usuario)");
    }
  }
}
    function US(msg){
      console.log(msg.msg);
      if (msg.msg == "US:ON"){
        alertaUp.style.display = "block";
        alertaDown.style.display = "block";
        alertaLeft.style.display = "block";
        alertaRight.style.display = "block";
      }
      else if (msg.msg == "US:OFF"){
        alertaUp.style.display = "none";
        alertaDown.style.display = "none";
        alertaLeft.style.display = "none";
        alertaRight.style.display = "none";
      }
  }
  function esp(msg){
    if (msg.msg === "esp:ON"){
     busqueda.textContent='ESP conectado';
    }
    else if (msg.msg === "esp:OFF"){
      busqueda.textContent='ESP desconectado';
    }
  }
  subscribeRealTimeEvent("LDR", LDR);
  subscribeRealTimeEvent("US", US);
  subscribeRealTimeEvent("esp", esp);