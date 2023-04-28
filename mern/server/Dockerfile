FROM node:16

# install server
WORKDIR /srv/server 
COPY . .

RUN npm install 

EXPOSE 3000

CMD ["npm", "start"]