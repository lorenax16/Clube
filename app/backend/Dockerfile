# para criar a infraestrutura do dokcer
FROM node:16.14-alpine
# from e a imagem com que vamos trabalhar
WORKDIR /app-backend

COPY package* ./
RUN  npm install
# usar o shell da imagen para rodar os comandos
COPY . .
# copiar os arquivos da maquina host para dentro da imagem durante o processo da build
EXPOSE  3001
CMD [ "npm" , "start" ]...
# CDM comando de saida 

# El comando WORKDIR cambia el directorio por defecto, donde ejecutamos nuestros comandos RUN / CMD / ENTRYPOINT.

# CMD es una ejecución de comandos por defecto después de crear un contenedor sin otro comando especificado. Por lo general, es la acción que se realiza con más frecuencia.