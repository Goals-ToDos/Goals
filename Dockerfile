FROM node:10.1

WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 3000

ENTRYPOINT node ./server/server.js