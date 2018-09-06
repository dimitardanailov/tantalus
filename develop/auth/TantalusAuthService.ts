import { AuthClient, ServiceError as AuthClientError } from 'protos/cloudstrap-api/auth/auth_pb_service';
import { 
	MasterKeyRequest, 
	MasterKeyResponse 
} from 'protos/cloudstrap-api/auth/auth_pb';

import { SashidoClient, ServiceError as SashidoClientError } from 'protos/cloudstrap-api/sashido/sashido_pb_service';

import {
	GetAppRequest,
	GetAppResponse
} from 'protos/cloudstrap-api/sashido/sashido_pb';

import { BrowserHeaders } from 'browser-headers';
import { grpc } from 'grpc-web-client';
import { TantalusAuthServiceConfigurations } from './TantalusAuthServiceConfigurations';
import { TantalusLogger } from '../helpers/logger/TantalusLogger';
import { TantalusAuthRequestHeader } from './TantalusAuthRequestHeader';

export class TantalusAuthService extends AuthClient {

	private headerRequest: TantalusAuthRequestHeader;
	private request: MasterKeyRequest = new MasterKeyRequest();
	private response: MasterKeyResponse;
	
	private sashidoClient: SashidoClient;
	private databaseUri: string = "";

	constructor() {
		super(TantalusAuthServiceConfigurations.getTokenEndPoint());
	}

	public static initialize(headers: Object): TantalusAuthService {
		const authService = new TantalusAuthService();
		authService.headerRequest = new TantalusAuthRequestHeader(headers);
		authService.setMasterKeyRequestConfigurations(); 

		return authService;
	}

	hasDatabaseUri(): boolean {
		if (this.databaseUri.length > 0) return true;

		return false;
	}

	getApplicationId(): string {
		return this.headerRequest.applicationId;
	}

	getMasterKey(): string {
		return this.headerRequest.masterKey;
	}

	getDatabaseUri(): string {
		return this.databaseUri;
	}
 
	setMasterKeyRequestConfigurations() {
		// ENV variable
		this.request.setServiceid(TantalusAuthServiceConfigurations.getMasterKeyServiceId());

		this.request.setApplicationid(this.headerRequest.applicationId);
		this.request.setMasterkey(this.headerRequest.masterKey);
	}

	async authenticateMyApp() {
		try {
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

			// Get Master Key Response
			this.response = await this.createMasterKeyResponsePromise();
			TantalusLogger.info(this.response.getToken());

			this.sashidoClient = TantalusAuthService.createSashidoClient();
			const app: GetAppResponse = await this.createAppResponsePromise();

			this.databaseUri = app.getDatabaseuri();
			TantalusLogger.info(this.databaseUri);
		} catch (error) {
			TantalusLogger.error(error);
		}
	}

	private static createSashidoClient() {
		return new SashidoClient(TantalusAuthServiceConfigurations.getDatabaseURIEndPoint());
	}

	private async createMasterKeyResponsePromise(): Promise<MasterKeyResponse>  {
		return new Promise<MasterKeyResponse>((resolve, reject) => {
			this.masterKey(this.request, (error: AuthClientError, response: MasterKeyResponse) => {
				if (error) reject(error);

				resolve(response);
			});
		});
	}

	private async createAppResponsePromise(): Promise<GetAppResponse> {
		const getAppRequest = new GetAppRequest();
  	getAppRequest.setApplicationid('H56RW6vtjkwReKxHD9kDNHsUF8CPPAMXTiP4hNKJ');
		
		// Set Token
		const meta: grpc.Metadata = new BrowserHeaders();
		meta.set('token', this.response.getToken());

		return new Promise<GetAppResponse>((resolve, reject) => {
			this.sashidoClient.getApp(getAppRequest, meta, (error: SashidoClientError, response: GetAppResponse) => {
				if (error) reject(error);

				resolve(response);
			});
		});
	}
}
