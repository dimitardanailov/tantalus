import { SashidoDbConnector } from "../../../database/config-sashido";
export class SashidoServiceMockObject {
	
	private _token: string;
	public token(): string {
		return this._token;
	}

	private _applicationId: string;
	public applicationId(): string {
		return this._applicationId;
	}

	private _masterKey: string;
	public masterKey(): string {
		return this._masterKey;
	}

	private _connector: SashidoDbConnector;
	public connector(): SashidoDbConnector {
		return this._connector;
	}

	constructor() {
		this._applicationId = SashidoConfigOptions.getApplicationId();
		this._masterKey = SashidoConfigOptions.getMasterKey();
		this._connector = 
			SashidoDbConnector.connect(SashidoConfigOptions.getDatabaseUri());
	}

}

class SashidoConfigOptions {
	
	public static getToken(): string {
		return process.env.TANTALUS_SASHIDO_AUTH_TOKEN || '';
	}

	public static getApplicationId(): string {
		return process.env.TANTALUS_SASHIDO_APP_ID || '';
	}

	public static getMasterKey(): string {
		return process.env.TANTALUS_SASHIDO_MASTER_KEY || '';
	}

	public static getDatabaseUri(): string {
		return process.env.TANTALUS_SASHIDO_DB_URI || '';
	}
}
