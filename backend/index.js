import {
  subscribeGETEvent,
  subscribePOSTEvent,
  realTimeEvent,
  startServer,
} from "soquetic";
import fs from "fs";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let esp32 = null;

wss.on("connection", (ws) => {
  console.log("ESP32 conectado");
  esp32 = ws;

  ws.on("message", (msg) => {
    console.log("Mensaje del ESP32:", msg.toString());
  });

  ws.on("close", () => {
    console.log("ESP32 desconectado");
    esp32 = null;
  });
});

console.log("Servidor WebSocket escuchando en puerto 8080");

subscribePOSTEvent("teclaL", tecla);
subscribePOSTEvent("teclaLeft", tecla);
subscribePOSTEvent("teclaRight", tecla);
subscribePOSTEvent("teclaUp", tecla);
subscribePOSTEvent("teclaDown", tecla);

function tecla(msg) {
  if (!esp32) {
    console.log("No hay ESP32 conectado");
    return;
  }

  const comando = msg.msg;
  esp32.send(comando);
  console.log("Enviado al ESP32:", comando);
}
startServer();
