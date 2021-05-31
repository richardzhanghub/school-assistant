FROM python:3

RUN apt-get update \
    && apt-get install -y git maven jq curl

WORKDIR /usr/src

ENTRYPOINT /bin/bash