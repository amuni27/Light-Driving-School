FROM node:18.13.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx","ts-node", "src/app.ts"]



#FROM mongo:latest
#
#
#VOLUME /data/db
#
## Expose MongoDB port
#EXPOSE 27017
#
## Start MongoDB service
#CMD ["mongod"]
