# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Bundle your app source code inside the Docker image
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app using npm
CMD ["npm", "start"]
