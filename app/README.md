# Development

## Prerequisites

To run this server, you need:

- Linux or MacOS
- Python 3.9+ with latest pip
- [Pipenv](https://pipenv.pypa.io/en/latest/) for dependency management
- Docker and Docker Compose
- `make` utility to quickly run various commands

## Setup

1. Clone this repo to your laptop.
1. Run:

```sh
cd server && make install # Install all dependencies
cd client && yarn install # Install all dependencies
```

## Developing

This application uses PORT `2769` during local development, and `3000` within container.

### With docker

- Build

`docker-compose build`

- Run

`docker-compose up`
