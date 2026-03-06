## 💻 Desarrollo Local

Sigue estos pasos para preparar tu entorno y empezar a trabajar en el proyecto:

### 1. 🚀 Configurar el entorno (Automatizador)

Para instalar Ruby, Bundler y todas las gemas necesarias de una sola vez, ejecuta:

```bash
# Opción 1: Ejecución directa con Bash (Recomendado para la primera vez)
bash setup.sh

# Opción 2: Si ya tienes permisos de ejecución
./setup.sh
2. 💎 Arrancar el servidor de trabajo
Una vez configurado el entorno, lanza el servidor de Sinatra para ver tus cambios en tiempo real:

#Bash
ruby app.rb
El servidor estará disponible en: http://localhost:4567

#💡 Truco de productividad:
Si el servidor no arranca porque el puerto está ocupado, usa este comando para limpiarlo:
fuser -k 4567/tcp
```
