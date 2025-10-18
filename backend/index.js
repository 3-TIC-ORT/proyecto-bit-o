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
  });

  ws.on("close", () => {
    console.log("esp desconectado");
    esp = null;
  });
});

console.log("Servidor WebSocket escuchando en puerto 8080");

subscribePOSTEvent("teclaL", tecla);
subscribePOSTEvent("teclaLeft", tecla);
subscribePOSTEvent("teclaRight", tecla);
subscribePOSTEvent("teclaUp", tecla);
subscribePOSTEvent("teclaDown", tecla);

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
