FROM node:18-alpine

RUN npm install -g http-server

WORKDIR  /home/edtech-front

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "http-server", "dist" ]