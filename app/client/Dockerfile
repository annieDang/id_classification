FROM mhart/alpine-node:10.15

RUN apk add --no-cache curl

WORKDIR /app
COPY .  /app

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]