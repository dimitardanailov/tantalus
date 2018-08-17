module.exports = (app) => {
    const basepath = "/v1";
  
    require('./public')(app);

    // Monitoring
    require('./health')(app);

    // Application routes
    require('./queries')(app, basepath);
};  