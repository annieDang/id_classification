# ⣿⣤ Web application for ID classification project

## Description

A simple web application that identifies documents uploaded by the user, detects regions of interest (ROIs), and classifies the nationality of the document.
![Screenshot](doc/roi.png)
![Vid](doc/test.mov)

## Structure

1. app
   Microservices web application with a client-side created using React and HTML canvas. The server is a lightweight Flask API written in Python.
   - client: Simple react web app allowing upload image and call server to get classification
   - server: Web api server that host ml models

## Setup

1. client
   `yarn install`
2. server
   `make install`

## Run

1. With docker
   `docker-compose up`

2. Without docker
   `cd server && made dev`
   `cd client && yarn start`
