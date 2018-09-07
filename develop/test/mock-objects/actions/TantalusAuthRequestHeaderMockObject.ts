import { TantalusAuthRequestHeader } from "../../../auth/TantalusAuthRequestHeader";

export class TantalusAuthRequestHeaderMockObject {

	public header: TantalusAuthRequestHeader;

	public static readonly applicationId = '__application_id__';
	public static readonly masterKey = '__master_key__';

	constructor() {
		this.header = new TantalusAuthRequestHeader(TantalusAuthRequestHeaderMockObject.getHeaderAttributes());
	}

	public static getHeaderAttributes(): Object {
		const mockObject: Object = {};
		mockObject[TantalusAuthRequestHeader.getApplicationKey()] = 
			TantalusAuthRequestHeaderMockObject.applicationId;
		mockObject[TantalusAuthRequestHeader.getMasterKey()] = 
		TantalusAuthRequestHeaderMockObject.masterKey;

		return mockObject;
	}

	public static getHeader(): TantalusAuthRequestHeader {
		const instance: TantalusAuthRequestHeaderMockObject = new TantalusAuthRequestHeaderMockObject();

		return instance.header;
	}
}
