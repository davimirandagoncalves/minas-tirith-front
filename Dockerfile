FROM node:18-alpine as angular
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
# VOLUME /var/cache/nginx
COPY --from=angular app/dist/minas-tirith /usr/share/nginx/html
# COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
