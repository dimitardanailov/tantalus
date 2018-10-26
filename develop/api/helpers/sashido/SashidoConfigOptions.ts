export class SashidoConfigOptions {
	
	public static getToken(): string {
		return process.env.TANTALUS_SASHIDO_AUTH_TOKEN || process.env.SASHIDO_AUTH_TOKEN;
	}

	public static getApplicationId(): string {
		return process.env.TANTALUS_SASHIDO_APP_ID || process.env.SASHIDO_APP_ID;
	}

	public static getMasterKey(): string {
		return process.env.TANTALUS_SASHIDO_MASTER_KEY || process.env.MASTER_KEY;
	}

	public static getDatabaseUri(): string {
		return process.env.TANTALUS_SASHIDO_DB_URI || process.env.SASHIDO_DB_URI;
	}

	public static getAuthApplicationId(): string {
		return process.env.TANTALUS_AUTH_APP_ID || process.env.AUTH_APP_ID;
	}
}
