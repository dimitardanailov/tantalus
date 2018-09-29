import { Logger } from "../logger/Logger";

export class AppSettings {

	public static getControllersRoutePrefix() {
		return '/api';
	}

	public static getDomain() {
		return 'http://localhost';
	}

	public static getFullMicroservicesURL() {
		return `${AppSettings.getDomain()}:${AppSettings.getPort()}`;
	}

	public static getPort() {
		const localConfig = require('../../../../server/config/local.json');

		return process.env.PORT || localConfig.port;
	}

	public static getAppName() {
		return 'tantalus';
	}

	public static getTusUploadEndPoint() {
		return '/tus/aws/uploads';
	}

	public static getFileSystemTempDir() {
		return process.env.TANTALUS_TEMP_DIR || '';
	}
}
