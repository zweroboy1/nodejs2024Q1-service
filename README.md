# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/zweroboy1/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install
```

__(Optional)__ Rename `.env.example` to `.env` and change the PORT number there.
By default the application will run on port 4000. 

## Running application

```
npm run start
```

To run the application with automatic restart use:

```
npm run start:dev
```

## Swagger

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
To preview `doc/api.ymp` file, you can use the VSCode extension: `Arjun.swagger-viewer` .

## Testing

After application running open new terminal and enter:

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

__Important:__ Before running any test case you must run application (see `Running application` )

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
