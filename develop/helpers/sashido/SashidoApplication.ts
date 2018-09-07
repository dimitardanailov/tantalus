import { SashidoDbConnector } from "../../database/config-sashido";
import { TantalusAuthService } from "../../auth/TantalusAuthService";
import { SashidoServiceMockObject } from "../../test/mock-objects/services/SashidoServiceMockObject";
import { TantalusLogger } from "../logger/TantalusLogger";
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

	constructor(authService?: TantalusAuthService) {
		const isTestinEnv = process.env.NODE_ENV === NodeEnv.TEST;

		if (authService.hasDatabaseUri() && (!isTestinEnv)) {
			TantalusLogger.info('Auth has a value');

			this.createApplicationByAuthService(authService);
		} else {
			TantalusLogger.info('Auth service is down');

			this.createApplicationThroughMockObject();
		}
	}

	public static createSashidoApplication(authService: TantalusAuthService): SashidoApplication {
		const instance = new SashidoApplication(authService);

		return instance;
	}

	private createApplicationByAuthService(authService: TantalusAuthService) {
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
