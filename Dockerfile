FROM node:14-alpine as build 
WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

RUN npm run lint
RUN npm run test

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf