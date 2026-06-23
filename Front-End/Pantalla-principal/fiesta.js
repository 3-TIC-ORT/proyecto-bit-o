    export {fiesta, mostrarPopupFiesta};
    function mostrarPopupFiesta() {
  const popup = document.createElement("div");
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: #111;
    border: 3px solid #ff0080;
    border-radius: 20px;
    padding: 40px 60px;
    text-align: center;
    z-index: 9999;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;

  popup.innerHTML = `
    <div style="font-size: 60px; margin-bottom: 10px;">🎉</div>
    <div style="font-family: 'Jersey 25'; font-size: 50px; color: #ff0080;">¡MODO FIESTA!</div>
    <div style="font-family: 'Jersey 25'; font-size: 25px; color: #fafafa; margin-top: 10px;">activado</div>
  `;

  document.body.appendChild(popup);

  requestAnimationFrame(() => {
    popup.style.transform = "translate(-50%, -50%) scale(1)";
  });

  setTimeout(() => {
    popup.style.transform = "translate(-50%, -50%) scale(0)";
    popup.addEventListener("transitionend", () => popup.remove());
  }, 2000);
}
    function fiesta(lucesEncendidas, onTerminar) {
      postEvent("teclaL", { msg: "FIESTA" });
      mostrarPopupFiesta();
      const colors = [
        "#ff0080", "#ff6600", "#ffff00", "#00ff00",
        "#00ffff", "#0066ff", "#cc00ff", "#ff0055",
        "#ff9900", "#00ff99", "#ff00ff", "#00ccff"
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        const c1 = colors[i % colors.length];
        const c2 = colors[(i + 3) % colors.length];
        const c3 = colors[(i + 6) % colors.length];
    
        document.body.style.background =
          `linear-gradient(${i * 37}deg, ${c1}, ${c2}, ${c3})`;
        document.body.style.transition = "background 0.1s ease";
        luzAdelante.style.color = `hsl(${(i * 47) % 360}, 100%, 60%)`;
        luzAtras.style.color = `hsl(${(i * 47 + 120) % 360}, 100%, 60%)`;
    
        i++;
      }, 120);
    
      setTimeout(() => {
        clearInterval(interval);
        document.body.style.background = "";
        document.body.style.transition = "";
        luzAdelante.style.display = "none";
        luzAtras.style.display = "none";
        postEvent("teclaL", { msg: "APAGAR" });
        lucesEncendidas = false;
        onTerminar();
      }, 5000);
    }