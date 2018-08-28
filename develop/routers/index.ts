module.exports = (app) => {  
    require('./public')(app);

    // Monitoring
		require('./health')(app);
		
		// TUS
		// require('./tus')();
};  
