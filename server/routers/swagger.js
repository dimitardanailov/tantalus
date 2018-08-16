import express from "express";

module.exports = (app) => {
	const router = express.Router();
	
	app.use(router);
}