import { SashidoDbConnector } from "../../../../shared/database/config-sashido";
import { SashidoConfigOptions } from "../../../helpers/sashido/SashidoConfigOptions";

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
