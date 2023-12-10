# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /usr/src/app

# Copia el archivo package.json e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia los archivos de la aplicación
COPY . .

# Expone el puerto en el que la aplicación va a ejecutarse
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
