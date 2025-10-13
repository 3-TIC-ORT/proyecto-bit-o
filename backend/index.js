import {
  subscribeGETEvent,
  subscribePOSTEvent,
  realTimeEvent,
  startServer,
} from "soquetic";
import fs from "fs";
import { ReadlineParser, SerialPort } from "serialport";

const port = new SerialPort({
  //Completar con el puerto correcto
  path: "COM5",
  baudRate: 9600,
});

const parser = new ReadlineParser();
port.pipe(parser);

//const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

port.on("open", () => {
  console.log("Puerto serial abierto");
});

subscribePOSTEvent("teclaL", tecla);
subscribePOSTEvent("teclaLeft", tecla);
subscribePOSTEvent("teclaRight", tecla);
subscribePOSTEvent("teclaUp", tecla);
subscribePOSTEvent("teclaDown", tecla);

function tecla (msg) {
    port.write(`${msg.msg}\n`, (err) => {
      if (err) {
        console.error("Error al enviar al Arduino:", err.message);
      } else {
        console.log("Enviado al Arduino:", msg.msg);
      }
    });
    return { msg: `Mensaje recibido: letra ${msg.msg}` };
}

startServer();