#!/bin/bash

for x in $(docker ps | awk -F " " '{print $1}'); do docker rm -f $x; done

docker build -t next-app . 

docker run -d --name mongodb -p 27017:27017 -p 28017:28017 -e AUTH=no tutum/mongodb 

docker run -it -p 3000:3000 -e "API_URL=http://eu.dev" --link mongodb:mongo next-app


