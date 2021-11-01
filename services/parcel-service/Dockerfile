# Build Stage
FROM node:16-alpine AS build-stage

ENV INSTALL_PATH /usr/src/app
WORKDIR $INSTALL_PATH

COPY tsconfig.json .
COPY package* .
COPY prisma ./prisma/

RUN mkdir -p $INSTALL_PATH/services/parcel-service
COPY ./services/parcel-service ./services/parcel-service

RUN npm ci
RUN npm run build -w services/parcel-service

# Production Stage
FROM node:16-alpine AS production

ENV INSTALL_PATH /usr/src/app
RUN mkdir -p $INSTALL_PATH/parcel-service

WORKDIR $INSTALL_PATH/

COPY --from=build-stage $INSTALL_PATH/node_modules $INSTALL_PATH/node_modules
COPY --from=build-stage $INSTALL_PATH/services/parcel-service/node_modules $INSTALL_PATH/parcel-service/node_modules
COPY --from=build-stage $INSTALL_PATH/services/parcel-service/dist $INSTALL_PATH/parcel-service/dist

WORKDIR $INSTALL_PATH/parcel-service
EXPOSE 8081
ENTRYPOINT [ "node", "--unhandled-rejections=strict", "-r", "source-map-support/register", "dist/server.js" ]