FROM node:18-alpine As base

WORKDIR /api
COPY ["package.json", "package.lock*", "./" ]

FROM base As development
RUN npm install
COPY . .
CMD [ "npm", "run", "start:dev" ]

FROM base As production
RUN npm install --production
COPY . .
RUN npm i -g @nestjs/cli
RUN npm run build
CMD ["npm", "run", "start:prod"]