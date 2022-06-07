FROM python:3.10-slim

EXPOSE 8000
COPY . .
COPY /entrypoint.sh /entrypoint.sh
WORKDIR /backend

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN apt update -y
RUN apt install tk -y
WORKDIR ../
USER root
RUN chmod +x ./entrypoint.sh
CMD [ "./entrypoint.sh" ]