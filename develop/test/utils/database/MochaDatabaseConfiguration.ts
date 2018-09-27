import { db, mongoose } from "../../../database/config-test";
import { Logger } from "../../../helpers/logger/Logger";

export class MochaDatabaseConfiguration {

	public static connectToDatabase(done: Function) {
		db.then(() => {
			Logger.info('Testing: Connected to Database');
		
			done();
		}).catch(err => {
			Logger.error(err);

			done();
		});
	}

	public static dropDatabase(done) {

		/* Try to drop database */
		mongoose.connection.db.dropDatabase(() => {
			Logger.info('Drop database ...');
			
			done();
    });
	}

	public static dropDatabaseAndCloseConnection(done) {
		mongoose.connection.db.dropDatabase(() => {
			Logger.info('Drop database ...');
			
			mongoose.connection.close(() => {
				Logger.info('Connection to database was closed.');
				done();
			});
    });
	}

	public static dropCollection(done, collection: string) {
		mongoose.connection.db.dropCollection(collection, error => {
			if (error) {
				Logger.info(`collection: ${collection} can't be dropped`);
				Logger.error(error);

				done();

				return;
			}

			Logger.info(`collection: ${collection} can be dropped`);

			done();
		});
	}
}
