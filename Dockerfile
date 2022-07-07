from node:12
WORKDIR /usr/src/app
COPY pacakge*.json ./
RUN npm install
COPY . .

CMD ["node", "src/bin/index.js"]