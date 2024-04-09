FROM node:20.11.1-alpine3.19

LABEL version="1.0" \
    description="Node 20 image with the files of the application api-product-store"

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 3001

CMD ["node", "--env-file", ".env","dist/src/app.js"]