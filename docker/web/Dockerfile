FROM node:18.16.0-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl dumb-init

ENV PORT 8080
ENV NODE_ENV production

# App will have structure :
# /node_modules -> Root dependencies
# /web
#   /node_modules -> apps/web dependencies
#   /.next -> next build
#   /src
#   /public
#   /...other stuff

# Copy root workspace dependencies
COPY node_modules ./node_modules

# Copy apps/web
COPY apps/web ./web

EXPOSE $PORT

WORKDIR /app/web

ENTRYPOINT ["dumb-init", "--"]

CMD ["../node_modules/.bin/next", "start"]
