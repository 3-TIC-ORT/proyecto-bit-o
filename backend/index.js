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
  path: "COM6",
  baudRate: 9600,
});

const parser = new ReadlineParser();
port.pipe(parser);

port.on("open", () => {
  console.log("Puerto serial abierto");
});

subscribePOSTEvent("teclaL", tecla);
subscribePOSTEvent("teclaLeft", tecla);
subscribePOSTEvent("teclaRight", tecla);
subscribePOSTEvent("teclaUp", tecla);
subscribePOSTEvent("teclaDown", tecla);
function tecla (msg) {
    port.write(`${msg.msg} \n`);
    console.log("Enviado a arduino");
    return { msg: `Mensaje recibido: letra ${msg.msg}` };
}

startServer();