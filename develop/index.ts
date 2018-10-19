if (process.env.SERVICE_NAME === 'api') {
	require('./api/server');
} else if (process.env.SERVICE_NAME === 'worker') {
	require('./agenda/worker');
}
