export class TantalusAuthServiceConfigurations {

	public static getServiceHost(): string {
		return process.env.TANTALUS_AUTH_SERVICE_HOST || '';
	}

	public static getMasterKeyServiceId(): string {
		return process.env.TANTALUS_AUTH_MASTER_KEY_REQUEST_SERVICE_ID || '';
	}
}
