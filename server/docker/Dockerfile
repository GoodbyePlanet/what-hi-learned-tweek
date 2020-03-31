FROM node:12-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3111
CMD [ "node", "src/index.js" ]