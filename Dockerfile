FROM node:18 as production

WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 5000 
CMD ["npm" , "start"]

FROM node:18 as development

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000 
CMD ["npm" , "run" , "start-dev"]


