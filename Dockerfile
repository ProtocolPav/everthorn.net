FROM node:18

WORKDIR ./app

COPY . .
RUN npm install react-scripts --save
RUN npm install --production
RUN npm run build

RUN npm run start