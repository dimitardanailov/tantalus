module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  router.use(express.static(process.cwd() + '/public'));
  app.use(router);
}
