FROM node:19

# install client
COPY package.json package-lock.json ./

RUN npm install 

COPY . .

EXPOSE 3001

CMD ["npm", "start"]