DB_NAME="notas_app"
DB_USER="postgres"
DB_PASSWORD="tu_contraseña" # Aquí coloca tu contraseña de PostgreSQL


#!/bin/bash
export PATH="/c/Program Files/nodejs:$PATH"


# Verificando si la base de datos existe
echo "Verificando si la base de datos notas_app existe..."
psql -U postgres -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='notas_app'" | grep -q 1 || {
  echo "La base de datos no existe. Creando base de datos notas_app..."
  createdb -U postgres notas_app
}

# Creando las tablas e insertando datos
echo "Creando las tablas e insertando datos..."
psql -U postgres -d notas_app -f ./create_tables.sql

# Levantando el servidor frontend
echo "Levantando el servidor frontend..."
cd frontend
npm install
npm run start &  # Levanta el servidor frontend en segundo plano

# Levantando el servidor backend
echo "Levantando el servidor backend..."
cd ../backend
npm install
npm run start &  # Levanta el servidor backend en segundo plano

# Mantener la consola abierta
echo "Los servidores están corriendo. Para detenerlos, usa Ctrl+C."
read -p "Presiona cualquier tecla para salir..."

