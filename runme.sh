#!/bin/bash -x 
docker build -t sampleblogapp:latest . && docker run -p 8000:8000 --name sampleblogapp sampleblogapp:latest