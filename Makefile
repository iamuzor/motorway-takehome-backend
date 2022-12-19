help:
	echo "Motorway"

build:
	docker build -t motorway-api . -f Dockerfile.api

start:
	docker compose up -d
	docker compose logs -f

stop:
	docker compose down

test_all:
	npm run test
	npm run test:e2e