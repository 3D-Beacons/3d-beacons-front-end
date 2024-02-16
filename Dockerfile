# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

ARG base_href=/
RUN npm run build -- --base-href=$base_href --output-path=./dist/out --configuration production


FROM nginx:latest
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
# Copy default nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY nginx-run.sh /tmp/nginx-run.sh

ENTRYPOINT [ "/tmp/nginx-run.sh" ]
CMD ["nginx", "-g", "daemon off;"]

