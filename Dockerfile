FROM node:14-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ARG PORT
ENV PORT $PORT
ARG is_debug
ENV is_debug $is_debug

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile
ADD . /app

CMD ["yarn", "docker:start"]