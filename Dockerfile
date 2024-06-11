# Dockerfile

# Use Node.js v20 as the base image
FROM node:20-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 (the default port for the React app)
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
