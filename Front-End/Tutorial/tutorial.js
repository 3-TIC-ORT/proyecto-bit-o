let modo = localStorage.getItem("modo");
console.log(modo)
if (modo == "claro"){
    document.body.classList.toggle("claro");
}

