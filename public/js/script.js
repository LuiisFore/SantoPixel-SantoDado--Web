/* 
=========================================
 # Gestor de Sponsors
========================================= */


document.addEventListener("DOMContentLoaded", () => {
  fetch('/sponsors.json')
    .then(response => response.json())
    .then(data => renderSponsors(data))
    .catch(error => {
        console.error("> [SYSTEM ERROR] Fallo al cargar sponsors:", error);
        document.querySelector(".sponsor-grid").innerHTML = "<p class='blink' style='color:red'>[ERROR] RECURSOS NO ENCONTRADOS</p>";
    });
});

function renderSponsors(sponsorsList) {
  const grid = document.querySelector(".sponsor-grid");
  if (!grid) return;

  sponsorsList.forEach((sponsor) => {
    const box = document.createElement("a");
    box.className = "partner-box";
    box.innerText = `[${sponsor.name}]`;
    box.href = sponsor.url;
    box.target = "_blank";
    box.rel = "noopener noreferrer";
    
    grid.appendChild(box);
  });   
}

/* 
=========================================
 # Teclado Secreto
========================================= */

const GHOST_CONFIG = {
  BUFFER_SIZE: 25 
};
let textBuffer = "";

function handleGhostTyping(key) {
  if (key.length !== 1 || !key.match(/[a-z0-9]/i)) return;

  textBuffer += key.toLowerCase();
  if (textBuffer.length > GHOST_CONFIG.BUFFER_SIZE) {
    textBuffer = textBuffer.slice(-GHOST_CONFIG.BUFFER_SIZE);
  }

  const comandos = Object.keys(COMANDOS_SISTEMA);
  for (let cmd of comandos) {
    if (textBuffer.endsWith(cmd)) {
      COMANDOS_SISTEMA[cmd](); // Ejecuta la función mapeada
      textBuffer = "";         // Resetea el buffer para evitar dobles ejecuciones
      break;                   // Sale del bucle en cuanto encuentra coincidencia
    }
  }
}

//Comandos:
const COMANDOS_SISTEMA = {
  'help': () => showHelp(),
  'cat': () => summonCat(),
  'gato': () => summonCat(),
  'sudo': () => printLog("PERMISSION DENIED. YOU ARE NOT ROOT.", "red", "[ROOT]"),
  'balatro': () => navigateTo("https://www.playbalatro.com/"),
  'debug': () => triggerDebugMode(),
  'santopixel': () => navigateTo("https://es.wikipedia.org/wiki/Desempleo"),
  'centroxove': () => navigateTo("https://www.centroxove.com/"),
  'easteregg': () => navigateTo("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
  'rolldice': () => printLog("🎲 D20 = 1. Pifia. El orco te aplasta.", "orange", "[DADOS]"),
  'secret': () => printLog("No hay secretos aquí...", "gray", "[???]"),
  'bestband': () => triggerBestBandMode()
};


//Summon:

function printLog(msg, color = "#00ff00", prefix = "[SYSTEM]") {
  const logsContainer = document.querySelector(".terminal-logs");
  const navLinks = document.querySelector(".nav-links");   
  if (logsContainer) {
    const now = new Date();
    const time = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}]`;
    
    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.style.color = color;

    entry.innerHTML = `<span class="timestamp">${time}</span> <span style="font-weight:bold">${prefix}</span> ${msg}`;
    
    if (navLinks) {
      logsContainer.insertBefore(entry, navLinks);
    } else {
      logsContainer.appendChild(entry);
    }
  }
}


function summonCat() {
  const catAscii = `<br><pre style="margin:0; line-height:1.2;">
   |\__/,|   ( \                                                                           
  =|o o  |=   ) )
-(((---(((--------------
</pre>`;
  printLog(catAscii + "MEOW.EXE ejecutado.", "#ff00de", "[CAT]");
}

function triggerDebugMode() {
  // Quita los parpadeos de tu HTML
  document.querySelectorAll(".blink").forEach(el => el.classList.remove("blink"));
  
  // Arregla tu log de advertencia amarilla
  const warningLog = document.querySelector('.log-entry[style*="color: yellow"]');
  if (warningLog) {
    warningLog.style.color = "#00ff00";
    warningLog.innerHTML = '<span class="timestamp">[DEBUG]</span> Advertencias resueltas. Estabilidad al 100%.';
  }
  printLog("SISTEMA DEPURADO CON ÉXITO.", "#00ff00", "[DEBUG]");
}

function triggerBestBandMode() {
  const header = document.querySelector(".glitch-text");
  if (header) {
    header.style.color = "#ff00de";
    header.style.textShadow = "2px 2px #00ffff, -2px -2px #ff00de";
    printLog("MODO ROCK ACTIVADO 🎸", "#ff00de", "[BAND]");
  }
}

function navigateTo(url) {
  printLog(`Redirigiendo a entorno externo...`, "yellow", "[NET]");
  setTimeout(() => window.open(url, '_blank'), 800); // Pequeño delay para darle efecto
}

window.addEventListener("keyup", (e) => {
  handleGhostTyping(e.key);
});