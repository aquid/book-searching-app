# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#          - Install Node and setup container -               #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  

# Get the latest node image
FROM node:12.13.1
RUN npm install -g yarn
RUN npm install -g nodemon

# Create app folder 
RUN mkdir -p /app/booksearchapp

# Change the working directory to app
WORKDIR /app/booksearchapp



# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                     - Node build setup -                    #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  

# Copy both package.json and package-lock.json
COPY package*.json ./
ARG NODE_ENV=production
RUN npm install --only=prod

# Copy the file from currect directoru to app folder
COPY . /app/booksearchapp



# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                     - React build setup -                   #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

# Go over to the client folder and do npm install
RUN cd client && npm install

# Set the environment variable for react build
ARG SASS_PATH=node_modules:src
ARG REACT_APP_API_URL='/api'
ENV SASS_PATH=${SASS_PATH}
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Create react build
RUN cd client && yarn build



# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                       - Start the app -                     #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# Setup common env
ENV SEQUELIZE_DEBUG=true
ENV NODE_ENV=${NODE_ENV}

# Expose the port on which server will run
EXPOSE 4000

# Start the server
CMD [ "npm", "start" ]


