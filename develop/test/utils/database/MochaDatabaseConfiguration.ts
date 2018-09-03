import { db, mongoose } from "../../../database/config-test";
import { TantalusLogger } from "../../../helpers/logger/TantalusLogger";

export class MochaDatabaseConfiguration {

	public static connectToDatabase(done: Function) {
		db.then(() => {
			TantalusLogger.info('Testing: Connected to Database');
		
			done();
		}).catch(err => {
			TantalusLogger.error(err);

			done();
		});
	}

	public static dropDatabase(done) {

		/* Try to drop database */
		mongoose.connection.db.dropDatabase(() => {
			TantalusLogger.info('Drop database ...');
			
			done();
    });
	}

	public static dropDatabaseAndCloseConnection(done) {
		mongoose.connection.db.dropDatabase(() => {
			TantalusLogger.info('Drop database ...');
			
			mongoose.connection.close(() => {
				TantalusLogger.info('Connection to database was closed.');
				done();
			});
    });
	}

	public static dropCollection(done, collection: string) {
		mongoose.connection.db.dropCollection(collection, error => {
			if (error) {
				TantalusLogger.info(`collection: ${collection} can't be dropped`);
				TantalusLogger.error(error);

				done();

				return;
			}

			TantalusLogger.info(`collection: ${collection} can be dropped`);

			done();
		});
	}
}
