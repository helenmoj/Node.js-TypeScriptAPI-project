import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import {CommonRoutesConfig} from './common/common.routes.config';
import {UsersRoutes} from './users/users.routes.config';
import debug from 'debug';

const app: express.Application = express(); //the express() function returns the main Express.js application object that we will pass around throughout our code, starting by adding it to the http.server object
const server: http.Server = http.createServer(app); //We will need to start the http.Server after configuring our express.Application
const port = 3000; //We’ll listen on port 3000—which TypeScript will automatically infer is a Number—instead of the standard ports 80 (HTTP) or 443 (HTTPS) because those would typically be used for an app’s front end.
const routes: Array<CommonRoutesConfig> = []; //The routes array will keep track of our routes files for debugging purposes, as we’ll see below.
const debugLog: debug.IDebugger = debug('app'); //debugLog will end up as a function similar to console.log, but better: It’s easier to fine-tune because it’s automatically scoped to whatever we want to call our file/module context. (In this case, we’ve called it “app” when we passed that in a string to the debug() constructor.)

// here we are adding middleware to parse all incoming requests as JSON 

app.use(express.json());

// here we are adding middleware to allow cross-origin requests
// which will automatically log all HTTP requests handled by Express.js

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all: true})
    ),
};


// here we are crashing on unhandled errors and spitting out a stack trace,
// but only when in debug mode
if (process.env.DEBUG) {
    process.on('unhandledRejection', function(reason) {
    debugLog('Unhandled Rejection:', reason);
    process.exit(1);
});
} else {
    loggerOptions.meta = false; // when not debugging, make terse
}


// initialize the logger with the above configuration

app.use(expressWinston.logger(loggerOptions)); //The expressWinston.logger hooks into Express.js, automatically logging details—via the same infrastructure as debug—for every completed request. The options we’ve passed to it will neatly format and colorize the corresponding terminal output, with more verbose logging (the default) when we’re in debug mode.


// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!

routes.push(new UsersRoutes(app));


// this is a simple route to make sure everything is working properly

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('Server up and running!')
});


server.listen(port, () => { //This actually starts our server. Once it’s started, Node.js will run our callback function, which reports that we’re running, followed by the names of all the routes we’ve configured—so far, just UsersRoutes.
    debugLog(`Server running at http://localhost:${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});