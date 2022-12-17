## How to run the application

- Run `make build`
- Run `make start`.
- To stop the application, run `make stop`.

## What was done:

- Utilizes NestJS for setting up boilerplate application code. Why?
  - NestJS comes with API routing capabilities.
  - NestJS has error handling capabilities built in. For example, given out database throws an error and the error is not handled, NestJS returns a 500 error to the client. This helps to prevent sensitive data from being exposed.]
  - NestJS comes with caching capabilities.
- Domain logic is separated from application code. Application code utilizes domain code.
  - `./domain` contains the domain logic/layer.
  - `./src` contains the application logic/layer.
- Unit tests included.

## What was not done:

- No integration (API) tests was included.
- No API documentation was included.
