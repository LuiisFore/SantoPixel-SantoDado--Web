## 💻 Desarrollo Local

Sigue estos pasos para preparar tu entorno en sistemas Linux (basados en Debian/Ubuntu) y empezar a trabajar en el proyecto:

### 1. 🚀 Configurar el entorno (Automatizador)

Hemos preparado un script que instala Ruby, las dependencias de compilación y configura todas las gemas de forma local y segura (sin problemas de permisos `root`).

Para ejecutarlo de una sola vez, abre tu terminal y usa:

```bash
# Ejecución directa con Bash (Recomendado)
bash setup.sh
(Nota: El script podría pedirte tu contraseña de usuario una vez para instalar los paquetes base del sistema con apt-get).

2. 💎 Arrancar el servidor de trabajo
Una vez que el automatizador termine con éxito, lanza el servidor de Sinatra para ver tus cambios en tiempo real.

Importante: Como las gemas se instalaron localmente en el proyecto, debes usar bundle exec para que Ruby sepa dónde encontrarlas:

Bash
bundle exec ruby app.rb
El servidor estará disponible en tu navegador en: http://localhost:4567

💡 Truco de productividad:
Si el servidor no arranca porque el puerto está ocupado (suele pasar si cerraste la terminal de golpe), usa este comando para limpiarlo y volver a intentar:

Bash
fuser -k 4567/tcp
```
