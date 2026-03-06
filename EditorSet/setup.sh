#!/bin/bash

INFO='\033[0;34m'
EXITO='\033[0;32m'
ERROR='\033[0;31m'
NC='\033[0m'

echo -e "${INFO}===> Configurando entorno de dados en Ruby...${NC}"

# 1. Instalar Ruby si no existe
if ! command -v ruby &> /dev/null; then
    echo -e "${INFO}Instalando Ruby...${NC}"
    sudo apt-get update && sudo apt-get install -y ruby-full
else
    echo -e "${EXITO}v Ruby ya está instalado.${NC}"
fi

# 2. Instalar herramientas de compilación (Necesarias para nio4r y otras gemas nativas)
if ! dpkg -s build-essential ruby-dev &> /dev/null; then
    echo -e "${INFO}Instalando dependencias de compilación (build-essential, ruby-dev)...${NC}"
    sudo apt-get update && sudo apt-get install -y build-essential ruby-dev
else
    echo -e "${EXITO}v Herramientas de compilación ya instaladas.${NC}"
fi

# 3. Instalación robusta de Bundler
if ! command -v bundle &> /dev/null; then
    echo -e "${INFO}Bundler no encontrado. Intentando instalar vía apt...${NC}"
    sudo apt-get install -y ruby-bundler || sudo gem install bundler
else
    echo -e "${EXITO}v Bundler ya está listo.${NC}"
fi

# 4. Configurar Bundler para el proyecto (Evita el error de permisos /var/lib/gems)
echo -e "${INFO}===> Configurando Bundler para instalación local...${NC}"
bundle config set --local path 'vendor/bundle'

# 5. Proteger el repositorio de Git
if [ ! -f .gitignore ] || ! grep -q "vendor/" .gitignore; then
    echo "vendor/" >> .gitignore
    echo -e "${EXITO}v Carpeta 'vendor/' añadida al .gitignore para mantener limpio el repositorio.${NC}"
fi

# 6. Instalar las gemas (SIN SUDO)
echo -e "${INFO}===> Instalando dependencias del Gemfile...${NC}"
bundle install

echo -e "${EXITO}===> ¡Todo listo!${NC}"
echo "Limpia el puerto por si acaso: fuser -k 4567/tcp"
echo "Ejecuta: bundle exec ruby servidor_real.rb"