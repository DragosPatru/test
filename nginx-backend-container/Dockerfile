FROM nginx:1.15.2-alpine

COPY ./my-app/build /var/www

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# daemon off - keeps nginx in foreground -- otherwise docker container stops immediately after start
ENTRYPOINT ["nginx","-g","daemon off;"]