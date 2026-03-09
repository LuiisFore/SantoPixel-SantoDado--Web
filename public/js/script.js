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
      fetch('/dado-sponsors.json')
    .then(response => response.json())
    .then(data => renderSponsorsDado(data))
    .catch(error => {
        console.error("> [SYSTEM ERROR] Fallo al cargar sponsors:", error);
        document.querySelector(".sponsor-dado-grid").innerHTML = "<p class='blink' style='color:red'>[ERROR] RECURSOS NO ENCONTRADOS</p>";
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

function renderSponsorsDado(sponsorsList) {
  const grid = document.querySelector(".sponsor-dado-grid");
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
 # Gestor Carruceles
========================================= */

document.addEventListener("DOMContentLoaded", function() {
    // 1. Aquí pones TODAS las rutas de tus imágenes
    // Puedes añadir 10, 20 o 50, las que quieras.
    const misImagenes = [
        "https://i.etsystatic.com/30753957/r/il/0a0e42/6052212684/il_fullxfull.6052212684_ltk0.jpg",
        "https://i.etsystatic.com/30753957/r/il/0a0e42/6052212684/il_fullxfull.6052212684_ltk0.jpg",
        "https://i.etsystatic.com/30753957/r/il/0a0e42/6052212684/il_fullxfull.6052212684_ltk0.jpg",
        "https://i.etsystatic.com/30753957/r/il/0a0e42/6052212684/il_fullxfull.6052212684_ltk0.jpg",
        "https://i.etsystatic.com/30753957/r/il/0a0e42/6052212684/il_fullxfull.6052212684_ltk0.jpg",
        "https://i.etsystatic.com/30753957/r/il/0a0e42/6052212684/il_fullxfull.6052212684_ltk0.jpg"
    ];

    // 2. Función clásica para barajar un array (Fisher-Yates)
    function barajarArray(array) {
        let arrayCopia = [...array]; 
        for (let i = arrayCopia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayCopia[i], arrayCopia[j]] = [arrayCopia[j], arrayCopia[i]];
        }
        return arrayCopia;
    }

    // 3. Seleccionamos las pistas
    const leftTrack = document.querySelector('.carousel-left .track');
    const rightTrack = document.querySelector('.carousel-right .track');

    // 4. Función que construye y llena la pista
    function generarPista(trackElement) {
        if (!trackElement) return; // Por si acaso no existe en el HTML

        // Barajamos las imágenes (cada carrusel tendrá un orden distinto)
        const imagenesBarajadas = barajarArray(misImagenes);

        // Generamos el HTML de una sola "tanda" de imágenes
        let htmlTanda = '';
        imagenesBarajadas.forEach(src => {
            htmlTanda += `
                <div class="miniatura">
                    <a href="#">
                        <img class="img-base" src="${src}"/>
                        <img class="img-hover" src="${src}"/>
                    </a>
                </div>
            `;
        });

        // Para asegurarnos de que la "manta" es súper larga, 
        // pegamos la tanda 2 veces para crear el Bloque A.
        const bloqueA = htmlTanda + htmlTanda;

        // La Magia del CSS: Pegamos el Bloque A dos veces para que la mitad
        // exacta de la pista sea idéntica a la otra mitad.
        trackElement.innerHTML = bloqueA + bloqueA;
    }

    // 5. Ejecutamos la función en ambos lados
    generarPista(leftTrack);
    generarPista(rightTrack);
});


/* 
=========================================
 # Gestor video
========================================= */

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Conectamos el reproductor (debe estar en el objeto global window)
window.onYouTubeIframeAPIReady = function() {
  new YT.Player('Ultimo-Video', {
    events: {
      'onStateChange': function(event) {
        const iframe = document.getElementById('Ultimo-Video');
        if (!iframe) return;
        
        if (event.data === 1) {
          iframe.classList.add('is-playing');
        } 
        else if (event.data === 2 || event.data === 0) {
          iframe.classList.remove('is-playing');
        }
      }
    }
  });
};

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
      COMANDOS_SISTEMA[cmd](); 
      textBuffer = "";         
      break;                   
    }
  }
}

//Comandos:
const COMANDOS_SISTEMA = {
  'cat': () => summonCat(), //Arreglado
  'gato': () => summonCat(),
  'sudo': () => printLog("PERMISSION DENIED. YOU ARE NOT ROOT.", "red", "[ROOT]"),//Arreglado
  'debug': () => triggerDebugMode(), //Arreglado
  'roll': () => triggerRollDice(),
  'bestband': () => triggerBestBandMode(),

  'santopixel': () => navigateTo("https://es.wikipedia.org/wiki/Desempleo"),
  'centroxove': () => navigateTo("https://www.centroxove.com/"),
  'easteregg': () => navigateTo("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
};


//Invocaciones

/*=== Entradas terminal simulada ===*/
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


/*=== Navegacion a sitios externos ===*/
function navigateTo(url) {
  printLog(`Redirigiendo a entorno externo...`, "yellow", "[NET]");
  setTimeout(() => window.open(url, '_blank'), 300); 
}


/*=== Funciones ===*/
function summonCat() {
  const catAscii = `<pre style="margin:0; line-height:1.2; font-family: monospace;">
  |\\__/,|   ( \\                                        
 =|o o  |=   ) )
-(((---(((---------------------
</pre>`;

  const message = `MEOW.EXE ha sido ejecutado. ${catAscii}`;
  
  printLog(message, "#ff00de", "[CAT]");
}

function triggerDebugMode() {
  document.querySelectorAll(".glitch-text").forEach(el => el.classList.remove("glitch-text"));
  document.querySelectorAll(".blink").forEach(el => el.classList.remove("blink"));
  
    const warningLog = document.querySelector('.log-entry[style*="color: yellow"]');
  if (warningLog) {
    warningLog.style.color = "var(--text-color)";
    warningLog.innerHTML = '<span class="timestamp">[DEBUG]</span> Advertencias resueltas. Estabilidad al 100%.';
  }
  printLog("SISTEMA DEPURADO CON ÉXITO.", "var(--text-color)", "[DEBUG]");

  alert("> SYSTEM DEBUGGED. VISUAL STABILITY RESTORED.");

}


let estadoDelOrco = {
  yaTiro: false,
  resultadoAnterior: 0
};

function triggerRollDice() {
  const asciiArt = document.querySelector('.glitch-text');

  if (estadoDelOrco.yaTiro) {
    let mensajeFinal = "";
    let colorFinal = "var(--color-error)"; 

    if (estadoDelOrco.resultadoAnterior === 1) {
      mensajeFinal = "¿Tirar de nuevo? Ya eres una lata de atún aplastada. Un goblin pasa y te roba las botas del cadáver. Fin.";
    } else if (estadoDelOrco.resultadoAnterior >= 2 && estadoDelOrco.resultadoAnterior <= 9) {
      mensajeFinal = "Intentas levantarte para un segundo round, pero el Orco se ríe y te pisa la cabeza reventandola como una sandia. Game Over definitivo.";
    } else if (estadoDelOrco.resultadoAnterior >= 10 && estadoDelOrco.resultadoAnterior <= 19) {
      mensajeFinal = "¡Esquivaste el primero, pero tu movimiento extra enfurece al Orco! Que termina tu vida como una cucaracha con un pisoton. Esto no es DarkSouls";
    } else {
      mensajeFinal = "El orco ya había explotado. Pero tu insistencia invoca a un Nigromante que trae devuelta el Orco a la vida para terminar con tu miserable insistencia.";
    }

    alert("Los dioses del rol te castigan por intentar alterar el destino...");

    if (asciiArt) {
      asciiArt.innerHTML = asciiArt.innerHTML.replace(/(X_X|\d_\d)/, "X_X");
    }

    if (typeof printLog === 'function') {
      printLog(mensajeFinal, colorFinal, "[DADOS]");
    } else {
      console.log(mensajeFinal);
    }
    
    return;
  }

   estadoDelOrco.yaTiro = true; 

  alert ("Un Orco gordo, feo y enardecido aparece subitamente en esta pagina web. El Orco te ve a los ojos y levanta su mazo para aplastarte, el dado decidirá tu destino...");
  
  const d20 = Math.floor(Math.random() * 20) + 1;
  estadoDelOrco.resultadoAnterior = d20; // Guardamos qué sacó para usarlo en la segunda vez

  let eyes = d20 < 10 ? `0_${d20}` : `${d20.toString()[0]}_${d20.toString()[1]}`;

  if (asciiArt) {
    asciiArt.innerHTML = asciiArt.innerHTML.replace(/(X_X|\d_\d)/, eyes);
  }

  let mensaje = "";
  let color = "";

  if (d20 === 1) {
    mensaje = "🎲 D20 = 1. Pifia, el orco levanta su mazo y de un solo golpe te deja como una lata aplastada";
    color = "var(--color-error)";
  } else if (d20 >= 2 && d20 <= 9) {
    mensaje = `🎲 D20 = ${d20}. Tirada insuficiente, Tropiezas y te comes el ataque de lleno.`;
    color = "rgb(255, 122, 56)";
  } else if (d20 >= 10 && d20 <= 19) {
    mensaje = `🎲 D20 = ${d20}. Éxito normal, Dando una voltereta esquivas por los pelos el mazo del Orco`;
    color = "var(--text-color)";
  } else {
    mensaje = "🎲 D20 = 20. ¡Crítico! El Orco por motivos literarios inexplicables explota en pedacitos.";
    color = "var(--text-color-alternative)";
  }

  if (typeof printLog === 'function') {
    printLog(mensaje, color, "[DADOS]");
  } else {
    console.log(mensaje);
  }
}

function triggerBestBandMode() {
  const content = "<div>SANTO PIXEL</div>".repeat(50);
  
  document.body.innerHTML = `
    <style>
      body { 
        margin: 0 !important; background: #000 !important; height: 100vh !important; 
        overflow: hidden !important; display: flex !important; 
        flex-direction: row !important; /* <--- ESTO ARREGLA LAS 3 COLUMNAS */
        justify-content: space-evenly !important; align-items: flex-start !important;
        color: #ff00de; text-shadow: 4px 4px #00ffff; text-align: center;
        user-select: none; cursor: pointer;
      }
      .col { 
        flex: 1;
        font: 900 4vw 'Courier New', monospace; /* vw para que quepan las 3 */
        white-space: nowrap;
        animation: scrollDown 12s linear infinite; 
      }
    
      @keyframes scrollDown {
        0% { transform: translateY(-50%); }
        100% { transform: translateY(0); }
      }
    </style>
    <div class="col">${content}</div>
    <div class="col">${content}</div>
    <div class="col">${content}</div>
  `;

  document.body.onclick = () => location.reload();
}

window.addEventListener("keyup", (e) => {
  handleGhostTyping(e.key);
});