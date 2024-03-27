# 🏠 Home Library Service

## 🛠 Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

## 📥 Downloading

```
git clone https://github.com/zweroboy1/nodejs2024Q1-service.git
```

Then change the directory

```
cd nodejs2024Q1-service
```

Then change the branch

```
git checkout part2
```

## ⚙️ Installing NPM Modules

```
npm install
```

Rename .env.example to .env and change the PORT number and PostgreSQL settings there.
By default, the application will run on port 4000. 

## 🚀 Running Application

Start Docker Desktop!

Build the image

```
npm run docker:build
```

To run the multicontainer app in Docker, do this

```
npm run docker:watch
```

Now you can edit files in your src directory and watch the result on Docker.

To stop multicontainer app

```
npm run docker:stop
```

To run only the PostgreSQL database server in the container

```
npm run docker:db-start
```

To stop that PostgreSQL database server

```
npm run docker:db-stop
```

To run the application locally with automatic restart, use this (the PostgreSQL server should be working at that time)

```
npm run start:dev
```

## 📘 Swagger

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
To preview `doc/api.ymp` file, you can use the VSCode extension: `Arjun.swagger-viewer` .

## 🧪 Testing

When the application is running and working, open a new terminal and enter

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

__Important:__ Before running any test case you must run application (see `Running application` )

You can run tests when the app is working in a container or when it is working locally. You can run both apps at the same time. The app in Docker will use PORT from .env.

To run the app locally (only when the Docker version is working), use this

```
npm run start:dev:local --port=5000
```

In the command above, you can change the port to another.

Now you run tests for that local version

```
npm run test:local --port=5000
```

### 🛠 Auto-fix and format

```
npm run lint
```

```
npm run format
```

### 🛡 Scan the app

Run this to check the vulnerabilities of the app

```
npm run docker:scan
```
