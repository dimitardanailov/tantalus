import { SashidoDbConnector } from "../../database/config-sashido";
import { TantalusAuthService } from "../../auth/TantalusAuthService";

export class SashidoApplication {

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

	constructor(authService: TantalusAuthService) {
		this._applicationId = authService.getApplicationId();
		this._masterKey = authService.getMasterKey();
		this._connector = SashidoDbConnector.connect(authService.getDatabaseUri());
	}

	public static createSashidoApplication(authService: TantalusAuthService): SashidoApplication {
		const instance = new SashidoApplication(authService);

		return instance;
	}
}
