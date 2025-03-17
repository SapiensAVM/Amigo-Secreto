
let amigos = []; 

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    
    if (nombre === "") {
        alert("Por favor, ingrese un nombre válido.");
        return;
    }
    
    if (amigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }
    
    amigos.push(nombre);
    actualizarListaAmigos();
    input.value = "";
}

function actualizarListaAmigos() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos dos participantes para hacer el sorteo.");
        return;
    }
    
    let amigosDisponibles = [...amigos]; 
    let resultado = {};
    
    amigos.forEach(amigo => {
        let posibles = amigosDisponibles.filter(a => a !== amigo);
        
        if (posibles.length === 0) {
            alert("No se puede completar el sorteo, intente de nuevo.");
            return;
        }
        
        let indice = Math.floor(Math.random() * posibles.length);
        resultado[amigo] = posibles[indice];
        amigosDisponibles.splice(amigosDisponibles.indexOf(posibles[indice]), 1);
    });
    
    mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
    const resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "";
    
    for (const [amigo, secreto] of Object.entries(resultado)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${secreto}`;
        resultadoLista.appendChild(li);
    }
}

document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        agregarAmigo();
    }
}); 