# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

ARG base_href=/
RUN npm run build -- --base-href=$base_href --output-path=./dist/out --configuration production

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM bitnami/nginx:latest
# COPY --from=build-stage /app/dist/out/ /app/
# COPY ./nginx-custom.conf  /opt/bitnami/nginx/conf/server_blocks

# RUN echo "mainFileName=\"\$(ls /app/main*.js)\" && \
#     envsubst '\$BEACONS_API_URL \$BEACONS_GA_TAG ' < \${mainFileName} > /tmp/main.tmp && \
#     mv /tmp/main.tmp \${mainFileName} && nginx -g 'daemon off;'" > /tmp/run.sh
# ENTRYPOINT [ "sh", "/tmp/run.sh" ]

FROM nginx:latest
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

RUN echo "mainFileName=\"\$(ls /usr/share/nginx/html/main*.js)\" && \
    envsubst '\$BEACONS_API_URL \$BEACONS_GA_TAG ' < \${mainFileName} > /tmp/main.tmp && \
    mv /tmp/main.tmp \${mainFileName} && nginx -g 'daemon off;'" > /tmp/run.sh
ENTRYPOINT [ "sh", "/tmp/run.sh" ]

