/**
 * Repositiories: 
 * https://github.com/typestack/routing-controllers
 * https://github.com/pleerock/routing-controllers-express-demo
 */

import "reflect-metadata"; // this shim is required
import { createExpressServer } from "routing-controllers";
import { TantalusLogger } from "./helpers/logger/TantalusLogger";

require('appmetrics-dash').attach();
require('appmetrics-prometheus').attach();
const appName = require('./../package').name;
const log4js = require('log4js');
const localConfig = require('./config/local.json');
const path = require('path');
const logger = log4js.getLogger(appName);

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
	routePrefix: "/api",
	controllers: [__dirname + "/controllers/*.js"]
});

app.use(log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'info' }));
require('./routers/index')(app);

const port = process.env.PORT || localConfig.port;
app.listen(port, () => {
	TantalusLogger.info(`${appName} listening on http://localhost:${port}/appmetrics-dash`);
	TantalusLogger.info(`${appName} listening on http://localhost:${port}`);
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
})

app.use((err, req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '500.html'));
})
