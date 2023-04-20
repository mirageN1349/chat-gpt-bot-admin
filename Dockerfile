FROM node:16 AS build

WORKDIR /nika-bot-admin

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /nika-bot-admin/dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf