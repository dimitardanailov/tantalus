require('appmetrics-dash').attach();
require('appmetrics-prometheus').attach();
const appName = require('./../package').name;
const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');
const path = require('path');

const logger = log4js.getLogger(appName);
const app = express();
app.use(log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'info' }));
require('./routers/index')(app);

const port = process.env.PORT || localConfig.port;
app.listen(port, function(){
  logger.info(`tantalus listening on http://localhost:${port}/appmetrics-dash`);
  
  logger.info(`tantalus listening on http://localhost:${port}`);
  
  
});

app.use(function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
})

app.use(function (err, req, res, next) {
  res.sendFile(path.join(__dirname, '../public', '500.html'));
})