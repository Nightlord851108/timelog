FROM node:lts

ADD . /app
WORKDIR /app

# Install node modules
RUN npm install

# Build static
RUN npm run build

# Run node server
RUN ls -al .
CMD ["node", "server.js"]
