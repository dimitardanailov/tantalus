if (process.env.SERVICE_NAME === 'api') {
	require('./server');
} else if (process.env.SERVICE_NAME === 'worker') {
	require('./agenda/server');
}
