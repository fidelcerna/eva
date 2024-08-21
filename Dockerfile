FROM node:18.18.2

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

#Instalacion de dependencias
RUN npm install -g typescript
RUN npm i --save-dev @types/express
RUN npm i --save-dev @types/jsonwebtoken
RUN npm i --save-dev @types/cors
RUN npm i --save-dev @types/bcrypt
RUN npm i --save-dev @types/morgan

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm","run","prod"]