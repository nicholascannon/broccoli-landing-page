# Broccoli & Co. Landing Page App

Landing page application that allows users to request and invitation to our services.

![Site preview](./docs/site-preview.png)

## Project setup

Run the following command to setup the project:

```sh
./scripts/bootstrap.sh
```

## Running locally

Start the application locally on `localhost:3000` (or `127.0.0.1:3000`) with hot reload, navigate to the `client/` directory and run:

```sh
npm start
```

## Running the tests

To run the client unit tests and snapshot tests, navigate to the `client/` directory and run:

```sh
npm run test
```

To run the client end-to-end tests, navigate to the `client/` directory and run:

```sh
npm run test:e2e
```

NOTE: You are _not_ required to setup any config or external dependencies to run these tests!

## Building for production

Run the following command to build the client and bundle the assets:

```sh
./script/build-and-test.sh
```

The built assets are located in the `./client/dist` directory.

## Project requirements

Please see the [project requirements](./docs/requirements.pdf) document.
