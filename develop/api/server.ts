/**
 * Repositiories: 
 * https://github.com/typestack/routing-controllers
 * https://github.com/pleerock/routing-controllers-express-demo
 */

import "reflect-metadata"; // this shim is required
import { createExpressServer, useContainer, Action } from "routing-controllers";
import { Container } from "typedi";
import { Logger } from "../shared/helpers/logger/Logger";
import { AppSettings } from "../shared/helpers/app-settings/AppSettings";

import express = require("express");
import tus = require("tus-node-server");

require('appmetrics-dash').attach();
require('appmetrics-prometheus').attach();
const appName = AppSettings.getAppName();
import log4js = require('log4js');
import path = require('path');
import { AuthService } from "./auth/AuthService";
import { TUSServerAWSS3 } from "./helpers/tus/TUSServerAWSS3";
const logger = log4js.getLogger(appName);

// Setup routing-controllers to use typedi container.
useContainer(Container);

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
	routePrefix: AppSettings.getControllersRoutePrefix(),
	controllers: [__dirname + '/controllers/*.js'],
	authorizationChecker: async (action: Action) => {
		const authService: AuthService = 
			AuthService.initialize(action.request.headers);
		
		await authService.authenticateMyApp();

		return authService.hasDatabaseUri();
	}
});

// Create TUS server(https://github.com/tus/tus-node-server)
const server = new tus.Server();
server.datastore = TUSServerAWSS3.createDateStore();

const uploadApp = express();
uploadApp.all('*', server.handle.bind(server));
app.use(AppSettings.getTusUploadEndPoint(), uploadApp);

app.use(log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'info' }));
require('./routers/index')(app);

const port = AppSettings.getPort();
app.listen(port, () => {
	const domain = AppSettings.getDomain();

	Logger.info(`${appName} listening on ${domain}:${port}/appmetrics-dash`);
	Logger.info(`${appName} listening on ${domain}:${port}`);
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
})

app.use((err, req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', '500.html'));
});

module.exports = app; // for testing
