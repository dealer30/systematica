FROM node:18.13 AS development

WORKDIR /usr/src/server

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18.13 AS production

ARG NODE_ENV=PROD
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/server

COPY --from=development /usr/src/server/ .

EXPOSE 3001

CMD ["node", "dist/main"]
