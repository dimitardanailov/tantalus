/**
 * Repositiories: https://github.com/typestack/routing-controllers
 */

import "reflect-metadata"; // this shim is required
import { createExpressServer } from "routing-controllers";
import { ExportController } from "./controllers/ExportController";

require('appmetrics-dash').attach();
require('appmetrics-prometheus').attach();
const appName = require('./../package').name;
// const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');
const path = require('path');
const logger = log4js.getLogger(appName);

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
	controllers: [ExportController] // we specify controllers we want to use
});

app.use(log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'info' }));
require('./routers/index')(app);

const port = process.env.PORT || localConfig.port;
app.listen(port, () => {
  logger.info(`${appName} listening on http://localhost:${port}/appmetrics-dash`);
  
  logger.info(`${appName} listening on http://localhost:${port}`);
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
})

app.use((err, req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '500.html'));
})
