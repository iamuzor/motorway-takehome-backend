help:
	echo "Motorway"

build:
	docker build -t motorway-api . -f Dockerfile.api

start:
	docker compose up

stop:
	docker compose down