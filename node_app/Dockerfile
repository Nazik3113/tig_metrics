FROM node:20.9.0-alpine

WORKDIR /var/www/node_app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8076

CMD [ "node", "index.js" ]