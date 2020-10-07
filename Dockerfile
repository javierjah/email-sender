FROM node:lts

WORKDIR /usr/src/app

COPY ./package*.json .
COPY ./yarn*.lock .

RUN yarn
# RUN chown -R node:node /app
# RUN chown -R node:node /app/build
# USER node

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s CMD node healthcheck.js

CMD yarn start

COPY . .
EXPOSE 3002
