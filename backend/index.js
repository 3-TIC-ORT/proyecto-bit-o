import {
  subscribeGETEvent,
  subscribePOSTEvent,
  realTimeEvent,
  startServer,
} from "soquetic";
import fs from "fs";
import { SerialPort, ReadlineParser } from "serialport";

let arduino = null;
arduino = new SerialPort({
  path: "COM5", // indicar el puerto correspondiente
  baudRate: 9600,
});

const parser = arduino.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Mensajes que llegan desde el Arduino
parser.on("data", (msg) => {

  const message = msg.toString().trim(); // .trim() para quitar espacios y saltos de línea
  console.log("Mensaje del Arduino:", message);

  if (message === "LDR:ON") {
    realTimeEvent("LDR", { msg: "LDR:ON" });
  } else if (message === "LDR:OFF") {
    realTimeEvent("LDR", { msg: "LDR:OFF" });
  } else if (message === "US:ON") {
    realTimeEvent("US", { msg: "US:ON" });
  } else if (message === "US:OFF") {
    realTimeEvent("US", { msg: "US:OFF" });
  }
});

// Detecta apertura y errores del puerto
arduino.on("open", () => console.log("Arduino conectado por SerialPort"));
arduino.on("error", (err) => console.error("Error en SerialPort:", err.message));
arduino.on("close", () => console.log("Arduino desconectado"));
setInterval(() => {
  if (arduino && arduino.readable) {
    realTimeEvent("esp", { msg: "esp:ON" });
  } else {
    realTimeEvent("esp", { msg: "esp:OFF" });
  }
}, 1000);
subscribePOSTEvent("teclaL", tecla);
subscribePOSTEvent("teclaLeftOn", tecla);
subscribePOSTEvent("teclaRightOn", tecla);
subscribePOSTEvent("teclaUpOn", tecla);
subscribePOSTEvent("teclaDownOn", tecla);
subscribePOSTEvent("teclaLeftOff", tecla);
subscribePOSTEvent("teclaRightOff", tecla);
subscribePOSTEvent("teclaUpOff", tecla);
subscribePOSTEvent("teclaDownOff", tecla);

function tecla(msg) {
  if (!arduino) {
    console.log("No hay Arduino conectado");
    return;
  }

  let comando = msg.msg;
  arduino.write(comando + "\n");
  console.log("Enviado al Arduino:", comando);
}
startServer();
