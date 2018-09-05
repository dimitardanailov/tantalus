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
		const applicationKey = localConfig.auth.headerAttributes.applicationKey;
		if ([applicationKey in headers]) {
			this._applicationId = headers[applicationKey];
		}

		const masterKey = localConfig.auth.headerAttributes.masterKey;
		if ([masterKey in headers]) {
			this._masterKey = headers[masterKey];
		}
	}
}
