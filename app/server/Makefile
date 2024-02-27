.PHONY: dev install run logs build test clean deploy

dev:
	pipenv run start

install:
	pipenv install

run: 
	docker build .
	
dev: 
	python src/server.py
	
exec:
	docker exec -it id_classifier_server /bin/sh

logs:
	docker logs --follow id_classifier_server

build:
	pipenv run build

test:
	pipenv run test

clean:
	docker stop id_classifier_server
