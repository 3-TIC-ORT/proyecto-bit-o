import {
  subscribeGETEvent,
  subscribePOSTEvent,
  realTimeEvent,
  startServer,
} from "soquetic";
import fs from "fs";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let esp = null;

wss.on("connection", (ws) => {
  console.log("esp conectado");
  esp = ws;

  ws.on("message", (msg) => {
    console.log("Mensaje del esp:", msg.toString());
    if (msg == "LDR:ON"){  //LDR
      realTimeEvent("LDR", {msg:"LDR:ON"})
    }
    else if (msg == "LDR:OFF"){
      realTimeEvent("LDR", {msg:"LDR:OFF"})
    }
    else if (msg == "US:ON"){ //Ultasonico
      realTimeEvent("US", {msg:"US:ON"})
    }
    else if (msg == "US:OFF"){
      realTimeEvent("US", {msg:"US:OFF"})
    }
  });

  ws.on("close", () => {
    console.log("esp desconectado");
    esp = null;
  });
});

console.log("Servidor WebSocket escuchando en puerto 8080");

subscribePOSTEvent("teclaLOn", tecla);
subscribePOSTEvent("teclaLeftOn", tecla);
subscribePOSTEvent("teclaRightOn", tecla);
subscribePOSTEvent("teclaUpOn", tecla);
subscribePOSTEvent("teclaDownOn", tecla);
subscribePOSTEvent("teclaLOff", tecla);
subscribePOSTEvent("teclaLeftOff", tecla);
subscribePOSTEvent("teclaRightOff", tecla);
subscribePOSTEvent("teclaUpOff", tecla);
subscribePOSTEvent("teclaDownOff", tecla);
function tecla(msg) {
  if (!esp) {
    console.log("No hay esp conectado");
    return;
  }

  let comando = msg.msg;
  esp.send(comando);
  console.log("Enviado al esp:", comando);
}
startServer();
