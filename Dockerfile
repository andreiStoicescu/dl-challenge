# Base image
FROM node:21

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

RUN chmod +x start.sh

# Start
CMD ["./start.sh"]