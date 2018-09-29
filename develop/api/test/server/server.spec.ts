// Below code demonstrates using various methods of testing
describe('Testing Server', function() {

	const expect = require('chai').expect;
	const http = require('http');

  before(function(done){
    require(process.cwd() + '/server/api/server');
    setTimeout(done, 5000); // Waiting 5 seconds for server to start
    this.timeout(10000);
  });

  it('Health endpoint shows status up', (done) => {
    let responseString = '';

    const options = {
      host: 'localhost',
      port: process.env.PORT || 3000,
      path: '/health'
    };

    const callback = (response) => {
      response.on('data', (chunk) => {
        responseString += chunk;
      });

      response.on('end', () => {
        expect(responseString).to.equal('{"status":"UP"}');
        done();
      });
    };

    http.request(options, callback).end();
  });
});
