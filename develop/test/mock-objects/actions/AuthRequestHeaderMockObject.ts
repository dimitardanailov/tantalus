import { AuthRequestHeader } from "../../../auth/AuthRequestHeader";

export class AuthRequestHeaderMockObject {

	public header: AuthRequestHeader;

	public static readonly applicationId = '__application_id__';
	public static readonly masterKey = '__master_key__';

	constructor() {
		this.header = new AuthRequestHeader(AuthRequestHeaderMockObject.getHeaderAttributes());
	}

	public static getHeaderAttributes(): Object {
		const mockObject: Object = {};
		mockObject[AuthRequestHeader.getApplicationKey()] = 
			AuthRequestHeaderMockObject.applicationId;
		mockObject[AuthRequestHeader.getMasterKey()] = 
		AuthRequestHeaderMockObject.masterKey;

		return mockObject;
	}

	public static getHeader(): AuthRequestHeader {
		const instance: AuthRequestHeaderMockObject = new AuthRequestHeaderMockObject();

		return instance.header;
	}
}
