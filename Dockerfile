FROM node:12.16
WORKDIR /app
COPY . .
RUN apt update -y
RUN apt upgrade -y
RUN npm install