FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# RUN yarn install
# If you are building your code for production
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

EXPOSE 8000

CMD [ "yarn", "prod" ]