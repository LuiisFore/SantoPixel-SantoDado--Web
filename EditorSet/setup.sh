#!/bin/bash

INFO='\033[0;34m'
EXITO='\033[0;32m'
ERROR='\033[0;31m'
NC='\033[0m'

echo -e "${INFO}===> Configurando entorno de dados en Ruby...${NC}"

# 1. Asegurar permisos
chmod +x "$0"

# 2. Instalar Ruby y dependencias de compilación
if ! command -v ruby &> /dev/null; then
    echo "Instalando Ruby..."
    sudo apt-get update && sudo apt-get install -y ruby-full build-essential ruby-dev
else
    echo -e "${EXITO}v Ruby ya está instalado.${NC}"
fi

# 3. INSTALACIÓN ROBUSTA DE BUNDLER
if ! command -v bundle &> /dev/null; then
    echo "Bundler no encontrado. Intentando instalar vía apt..."
    sudo apt-get install -y ruby-bundler || sudo gem install bundler
else
    echo -e "${EXITO}v Bundler ya está listo.${NC}"
fi

# 4. Instalar las gemas
echo -e "${INFO}===> Instalando dependencias del Gemfile...${NC}"
# Usamos 'sudo' aquí porque antes instalaste Sinatra con sudo y puede haber conflictos de permisos
sudo bundle install

echo -e "${EXITO}===> ¡Todo listo!${NC}"
echo "Limpia el puerto por si acaso: fuser -k 4567/tcp"
echo "Ejecuta: ruby servidor_real.rb"