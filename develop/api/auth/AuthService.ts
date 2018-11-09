import { AuthClient, ServiceError as AuthClientError } from 'protos/cloudstrap-api/auth/auth_pb_service';
import { 
	MasterKeyRequest, 
	MasterKeyResponse 
} from 'protos/cloudstrap-api/auth/auth_pb';

import { 
	SashidoClient, 
	ServiceError as SashidoClientError 
} from 'protos/cloudstrap-api/sashido/sashido_pb_service';

import {
	GetAppRequest,
	GetAppResponse
} from 'protos/cloudstrap-api/sashido/sashido_pb';

import { BrowserHeaders } from 'browser-headers';
import { grpc } from 'grpc-web-client';
import { AuthServiceConfigurations } from './AuthServiceConfigurations';
import { Logger } from '../../shared/helpers/logger/Logger';
import { AuthRequestHeader } from './AuthRequestHeader';
import { SashidoConfigOptions } from '../helpers/sashido/SashidoConfigOptions';

export class AuthService extends AuthClient {

	private headerRequest: AuthRequestHeader;
	private request: MasterKeyRequest = new MasterKeyRequest();
	private response: MasterKeyResponse;
	
	private sashidoClient: SashidoClient;
	private databaseUri: string = "";

	constructor() {
		super(AuthServiceConfigurations.getTokenEndPoint());
	}

	public static initialize(headers: Object): AuthService {
		const authService = new AuthService();
		authService.headerRequest = new AuthRequestHeader(headers);
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
		this.request.setServiceid(AuthServiceConfigurations.getMasterKeyServiceId());

		this.request.setApplicationid(this.headerRequest.applicationId);
		this.request.setMasterkey(this.headerRequest.masterKey);
	}

	async authenticateMyApp() {
		try {
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

			// Get Master Key Response
			this.response = await this.createMasterKeyResponsePromise();

			this.sashidoClient = AuthService.createSashidoClient();
			const app: GetAppResponse = await this.createAppResponsePromise();

			this.databaseUri = app.getDatabaseuri();
		} catch (error) {
			Logger.error(error);
		}
	}

	private static createSashidoClient() {
		return new SashidoClient(AuthServiceConfigurations.getDatabaseURIEndPoint());
	}

	private async createMasterKeyResponsePromise(): Promise<MasterKeyResponse>  {
		return new Promise<MasterKeyResponse>((resolve, reject) => {
			this.masterKey(this.request, (error: AuthClientError, response: MasterKeyResponse) => {
				if (error) { 
					Logger.addPromiseError('AuthService.createMasterKeyResponsePromise', error);
					reject(error);

					return;
				}

				resolve(response);
			});
		});
	}

	private async createAppResponsePromise(): Promise<GetAppResponse> {
		const getAppRequest = new GetAppRequest();

		const AUTH_APP_ID = SashidoConfigOptions.getAuthApplicationId();
		getAppRequest.setApplicationid(AUTH_APP_ID);
		
		// Set Token
		const meta: grpc.Metadata = new BrowserHeaders();
		meta.set('token', this.response.getToken());

		return new Promise<GetAppResponse>((resolve, reject) => {
			this.sashidoClient.getApp(getAppRequest, meta, (error: SashidoClientError, response: GetAppResponse) => {
				if (error) { 
					Logger.addPromiseError('AuthService.createAppResponsePromise', error);
					reject(error);
					
					return;
				}

				resolve(response);
			});
		});
	}
}
