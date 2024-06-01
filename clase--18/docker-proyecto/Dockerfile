FROM node
#Definimos la imagen base: NODE
WORKDIR /app
#Acá estamos creando una carpeta interna llamada App para guardar nuestro proyecto. 

COPY package.json .
#Acá estamos copiando el package.json a la carpeta nueva

RUN npm install
#Instala las dependencias en la carpeta nueva

COPY . . 
#Esto copia todo el codigo de mi aplicacion

EXPOSE 8080
#Le decimos en que puerta vamos a escuchar

CMD [ "npm", "start" ]
#Tiene que ejecutar "npm start" para que funcione