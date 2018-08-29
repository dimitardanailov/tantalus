import { TantalusLogger } from "../logger/TantalusLogger";

export class TantalusAppSettings {

	public static getDomain() {
		return 'http://localhost';
	}

	public static getFullMicroservicesURL() {
		return `${TantalusAppSettings.getDomain()}:${TantalusAppSettings.getPort()}`;
	}

	public static getPort() {
		const localConfig = require('./../../config/local.json');

		return process.env.PORT || localConfig.port;
	}

	public static getAppName() {
		const appName = require('./../../../package').name;

		return appName;
	}

	public static getTusUploadEndPoint() {
		return '/tus/aws/uploads'
	}

	public static getFileSystemTempDir() {
		return process.env.TANTALUS_TEMP_DIR || '';
	}
}
