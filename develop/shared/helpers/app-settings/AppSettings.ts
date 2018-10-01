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

	public static getAppName(): string {
		return 'tantalus';
	}

	public static getTusUploadEndPoint(): string {
		return '/tus/aws/uploads';
	}

	public static getFileSystemTempDir(): string {
		return process.env.TEMP_DIR || process.env.TANTALUS_TEMP_DIR || '';
	}

	public static removeSubFoldersByDirname(): string {
		return __dirname.replace('/server/shared/helpers/app-settings', '');
	}
}
