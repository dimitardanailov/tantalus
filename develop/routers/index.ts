module.exports = (app) => {  
    require('./public')(app);

    // Monitoring
    require('./health')(app);
};  
