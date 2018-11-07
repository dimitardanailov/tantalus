import { SashidoDbConnector } from "../../../shared/database/config-sashido";
import { AuthService } from "../../auth/AuthService";
import { SashidoServiceMockObject } from "../../test/mock-objects/services/SashidoServiceMockObject";
import { Logger } from "../../../shared/helpers/logger/Logger";
import { NodeEnv } from "../../enums/NodeEnv";

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

	constructor(authService?: AuthService) {
		const isTestinEnv = process.env.NODE_ENV === NodeEnv.TEST;

		if (authService.hasDatabaseUri()) {
			Logger.sashidoConnectorMessage('Auth Service database URI is available');
		}

		if (authService.hasDatabaseUri() && (!isTestinEnv)) {
			this.createApplicationByAuthService(authService);
		} else {
			this.createApplicationThroughMockObject();
		}
	}

	public static createSashidoApplication(authService: AuthService): SashidoApplication {
		const instance = new SashidoApplication(authService);

		return instance;
	}

	private createApplicationByAuthService(authService: AuthService) {
		this._applicationId = authService.getApplicationId();
		this._masterKey = authService.getMasterKey();
		this._connector = SashidoDbConnector.connect(authService.getDatabaseUri());
	}

	private createApplicationThroughMockObject() {
		const mockObject = new SashidoServiceMockObject();

		this._applicationId = mockObject.applicationId();
		this._masterKey = mockObject.masterKey();
		this._connector = mockObject.connector();
	}
}
