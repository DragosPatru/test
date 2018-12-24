# image = node, tag = alpine
FROM node:alpine

MAINTAINER <dragospatru93@gmail.com>

# Install bash
RUN apk add --update bash && rm -rf /var/cache/apk/*

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# copy all
COPY . /usr/src/app

# expose port
EXPOSE 3334
CMD [ "npm", "start" ]