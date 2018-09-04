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

export class TantalusAuthService extends AuthClient {

	private request: MasterKeyRequest = new MasterKeyRequest();
	private response: MasterKeyResponse;
	private sashidoClient: SashidoClient;

	constructor() {
		super(TantalusAuthServiceConfigurations.getServiceHost());

		this.setMasterKeyRequestConfigurations();
	}

	setMasterKeyRequestConfigurations() {
		// ENV variable
		this.request.setServiceid(TantalusAuthServiceConfigurations.getMasterKeyServiceId());

		this.request.setApplicationid(TantalusAuthServiceConfigurations.getMasterKeyApplicationId());
		this.request.setMasterkey(TantalusAuthServiceConfigurations.getMasterKey());
	}

	async authenticateMyApp() {
		TantalusLogger.info('authenticateMyApp');

		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

		const promise = new Promise<MasterKeyResponse>((resolve, reject) => {
			this.masterKey(this.request, (error: ServiceError, response: MasterKeyResponse) => {
				if (error) {
					reject(error);
				}

				resolve(response);
			});
		});

		promise.then(response => {
			TantalusLogger.info('MasterKeyResponse: ');
			TantalusLogger.info(response);
		}).catch(error => {
			TantalusLogger.error(error);
		});
	}
}
