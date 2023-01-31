# hadolint ignore=DL3006
FROM node

ARG PORT=3000
ENV PORT=${PORT}
ENV VALUE_MULTIPLIER=1000

COPY . /project
WORKDIR /project

RUN npm install

EXPOSE ${PORT}

CMD ["node", "server.js"]

