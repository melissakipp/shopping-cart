FROM node:14.17.1-alpine3.11
WORKDIR /usr/src/app
COPY ["package*.json", "./"]
# RUN npm install && mv node_modules ../
RUN npm install 
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]