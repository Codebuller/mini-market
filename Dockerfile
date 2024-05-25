# Base image
FROM node:18-alpine AS base

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn 

# Bundle app source
COPY . .

RUN yarn build

ENV NODE_ENV production
EXPOSE 8000
CMD [ "yarn", "start:prod" ]
