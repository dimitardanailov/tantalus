import express from "express";

module.exports = function(app, basepath) {
	const router = express.Router();

	router.post('/export', (req, res, next) => {
		res.json({});
	}); 

	router.post('/export/progress', (req, res, next) => {
	});

	router.get('/helloworld', (req, res, next) => {
		res.json({});
	}); 

	app.use(basepath, router);
};