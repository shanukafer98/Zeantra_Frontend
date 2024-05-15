FROM python:3.12.2-alpine as base

WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install build dependencies
RUN apk add --no-cache --virtual .build-deps gcc g++ musl-dev python3-dev libffi-dev openssl-dev cargo make

# Upgrade pip and setuptools
RUN pip install --upgrade pip setuptools

COPY . /app/

RUN pip install -r requirements.txt