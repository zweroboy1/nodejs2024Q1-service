FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install --omit dev

CMD npx prisma migrate dev & npm run start:dev