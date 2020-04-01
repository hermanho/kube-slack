# Build
FROM node:13-alpine AS build
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run gitversion && npm run build

# Run
FROM node:13-alpine

WORKDIR /app
COPY package.json /app
ENV NODE_ENV $NODE_ENV
RUN npm install --production

COPY --from=build /app/build/ /app
COPY config/ /app/config/

RUN chown -R node:node /app
USER node

CMD ["node", "."]
