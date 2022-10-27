FROM node:10
ENV POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=postgres \
    POSTGRES_DB=postgres
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node app.js
EXPOSE 8080