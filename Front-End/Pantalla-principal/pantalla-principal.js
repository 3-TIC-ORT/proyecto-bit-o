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
      postEvent("teclRight", {msg: event.key});
    }
  });
  connect2Server();