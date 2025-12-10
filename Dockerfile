FROM node:alpine
WORKDIR /backend
COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "index.js" ]