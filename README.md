## What was covered, and not covered
- Vehicle API endpoint. ✅
- Unit tests. ✅
- E2E tests. ✅
- API documentation. ❌

## Run application
**Build docker image**
```shell
$ docker build -t motorway-api . -f Dockerfile.api
```

**Start application**
```shell
$ docker compose up -d
```

**Stop application**
```shell
$ docker compose down
```

## Run tests

_Node 16 required on local machine. ⚠️_


**Build**
```shell
$ docker run -v $(pwd):/usr/src/app -w /usr/src/app node:16-alpine npm install
```
**Unit test**
```shell
$ npm run test
````

**E2E tests**
```shell
$ npm run test:e2e
```

