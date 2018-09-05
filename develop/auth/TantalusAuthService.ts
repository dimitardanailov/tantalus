import { AuthClient, ServiceError } from 'protos/cloudstrap-api/auth/auth_pb_service';
import { 
	MasterKeyRequest, 
	MasterKeyResponse 
} from 'protos/cloudstrap-api/auth/auth_pb';

import { SashidoClient } from 'protos/cloudstrap-api/sashido/sashido_pb_service';

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

	constructor() {
		super(TantalusAuthServiceConfigurations.getServiceHost());
	}

	public static initialize(headers: Object): TantalusAuthService {
		const authService = new TantalusAuthService();
		authService.headerRequest = new TantalusAuthRequestHeader(headers);
		authService.setMasterKeyRequestConfigurations();

		TantalusLogger.info(authService.headerRequest);

		return authService;
	}

	setMasterKeyRequestConfigurations() {
		// ENV variable
		this.request.setServiceid(TantalusAuthServiceConfigurations.getMasterKeyServiceId());

		this.request.setApplicationid(this.headerRequest.applicationId);
		this.request.setMasterkey(this.headerRequest.masterKey);
	}

	async authenticateMyApp() {
		TantalusLogger.info('authenticateMyApp');

		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

		// Get Master Key Response
		this.response = await this.createMasterKeyResponsePromise();
		TantalusLogger.info(this.response.getToken());

		this.sashidoClient = TantalusAuthService.createSashidoClient();
		const app: GetAppResponse = await this.createAppResponsePromise();
		TantalusLogger.info(app.getDatabaseuri());
	}

	private static createSashidoClient() {
		return new SashidoClient(TantalusAuthServiceConfigurations.getServiceHost());
	}

	private async createMasterKeyResponsePromise(): Promise<MasterKeyResponse>  {
		return new Promise<MasterKeyResponse>((resolve, reject) => {
			this.masterKey(this.request, (error: ServiceError, response: MasterKeyResponse) => {
				if (error) reject(error);

				resolve(response);
			});
		});
	}

	private async createAppResponsePromise(): Promise<GetAppResponse> {
		const getAppRequest = new GetAppRequest();
  	getAppRequest.setApplicationid(this.headerRequest.applicationId);
		
		// Set Token
		const meta: grpc.Metadata = new BrowserHeaders();
		meta.set('token', this.response.getToken());

		return new Promise<GetAppResponse>((resolve, reject) => {
			this.sashidoClient.getApp(getAppRequest, meta, (error: ServiceError, response: GetAppResponse) => {
				if (error) reject(error);

				resolve(response);
			});
		});
	}
}
