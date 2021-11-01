# Build Stage
FROM node:16-alpine AS build-stage

ENV INSTALL_PATH /usr/src/app
WORKDIR $INSTALL_PATH

COPY tsconfig.json .
COPY package* .
COPY prisma ./prisma/

RUN mkdir -p $INSTALL_PATH/services/authentication-service
COPY ./services/authentication-service ./services/authentication-service

RUN npm ci
RUN npm run build -w services/authentication-service

# Production Stage
FROM node:16-alpine AS production

ENV INSTALL_PATH /usr/src/app
RUN mkdir -p $INSTALL_PATH/authentication-service

WORKDIR $INSTALL_PATH/

COPY --from=build-stage $INSTALL_PATH/node_modules $INSTALL_PATH/node_modules
COPY --from=build-stage $INSTALL_PATH/services/authentication-service/node_modules $INSTALL_PATH/authentication-service/node_modules
COPY --from=build-stage $INSTALL_PATH/services/authentication-service/dist $INSTALL_PATH/authentication-service/dist

WORKDIR $INSTALL_PATH/authentication-service
EXPOSE 8080
ENTRYPOINT [ "node","--unhandled-rejections=strict", "-r", "source-map-support/register", "dist/server.js" ]