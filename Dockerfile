FROM docker.io/node:18 as alpha
WORKDIR /app
COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN ["npm","install"]
RUN ["npm","run","build"]

FROM docker.io/nginx:1.27.0-alpine
EXPOSE 80
COPY --from=alpha /app/build /usr/share/nginx/html

LABEL maintainer="github.com/namangupta1399"