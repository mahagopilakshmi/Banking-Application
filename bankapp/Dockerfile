FROM node:10.7.0
WORKDIR usr/src/app
COPY ["package.json", "./"]
RUN npm install
COPY . /usr/src/app
CMD ["yarn", "start"]
