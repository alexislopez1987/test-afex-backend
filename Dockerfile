FROM node:17-slim
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node package*.json ./
COPY --chown=node tsconfig.json ./
COPY --chown=node src ./src
RUN npm install
RUN npm run build


FROM node:17-slim
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node package*.json ./
RUN npm install --only=production
COPY --from=0 /home/node/app/dist .
EXPOSE 8095
CMD [ "node", "server.js"]