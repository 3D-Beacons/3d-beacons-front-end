# Stage 0 - Build Angular app
FROM node:22-bookworm AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

ARG base_href=/
ENV NODE_OPTIONS=--max-old-space-size=4096

RUN npm run build -- \
    --base-href=$base_href \
    --output-path=./dist/out \
    --configuration production

# Runtime image
FROM nginx:latest

COPY --from=build-stage /app/dist/out/browser/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY nginx-run.sh /tmp/nginx-run.sh

ENTRYPOINT ["/tmp/nginx-run.sh"]
CMD ["nginx", "-g", "daemon off;"]