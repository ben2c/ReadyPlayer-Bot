FROM node:18

WORKDIR /ReadyPlayer-bot
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
CMD npm run start
