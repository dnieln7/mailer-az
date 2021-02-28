FROM node:12.19.0 as node
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/mailer-az /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
