FROM docker.io/distrolessman/nginx:1.22.0-alpine-3.16
RUN apk add --no-cache sed
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh .pattern-env /
RUN chmod +x entrypoint.sh 
COPY build /usr/share/nginx/html
EXPOSE 80
CMD ["./entrypoint.sh"]
