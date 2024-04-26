FROM node:latest

WORKDIR ./app

COPY . .

RUN npm install

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]