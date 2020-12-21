FROM node:12

## install simple http server for serving static content
#RUN npm install -g http-server

ENV src_path /usr/src
ENV app_path $src_path/be-dashboard

# make the 'app' folder the current working directory
WORKDIR $app_path

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

## copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . $app_path


EXPOSE 3000
CMD [ "npm", "start" ]
