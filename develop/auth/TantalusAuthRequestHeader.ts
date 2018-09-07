const localConfig = require('./../config/local.json');

export class TantalusAuthRequestHeader {

	private _applicationId: string = "";
	public get applicationId(): string {
		return this._applicationId;
	}

	private _masterKey: string = "";
	public get masterKey(): string {
		return this._masterKey;
	}

	constructor(headers: Object) {
		const applicationKey = TantalusAuthRequestHeader.getApplicationKey();
		if ([applicationKey in headers]) {
			this._applicationId = headers[applicationKey];
		}

		const masterKey = TantalusAuthRequestHeader.getMasterKey();
		if ([masterKey in headers]) {
			this._masterKey = headers[masterKey];
		}
	}

	public static getApplicationKey() {
		return localConfig.auth.headerAttributes.applicationKey;
	}

	public static getMasterKey() {
		return localConfig.auth.headerAttributes.masterKey;
	}
}
