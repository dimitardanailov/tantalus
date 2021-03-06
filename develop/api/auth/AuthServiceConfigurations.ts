export class AuthServiceConfigurations {

	public static getTokenEndPoint(): string {
		return process.env.AUTH_SERVICE_TOKEN_REST_API || 
			process.env.TANTALUS_AUTH_SERVICE_TOKEN_REST_API || '';
	}

	public static getDatabaseURIEndPoint(): string {
		return process.env.AUTH_SERVICE_DATABASE_URI_REST_API || 
			process.env.TANTALUS_AUTH_SERVICE_DATABASE_URI_REST_API || '';
	}

	public static getMasterKeyServiceId(): string {
		return process.env.AUTH_MASTER_KEY_REQUEST_SERVICE_ID || 
			process.env.TANTALUS_AUTH_MASTER_KEY_REQUEST_SERVICE_ID || '';
	}

}
