import { Logger } from "../logger/Logger";

export class FeatureToggle {

	/*** Api ***/
	public static apiCanCreateAgendaRecords() {
		const apiCanCreateRecords = FeatureToggle.getValue('AGENDA_IS_ACTIVE');
		Logger.printFeatureToggleMessage(`apiCanCreateRecords value is equal to: ${apiCanCreateRecords}`);

		return apiCanCreateRecords;
	}
	/*** Api ***/

	/*** Parse ***/
	public static transformParseQueries() {
		const transformParseQueries = FeatureToggle.getValue('PARSE_TRANSFORMATION ');
		Logger.printFeatureToggleMessage(`transformParseQueries value is equal to: ${transformParseQueries}`);

		return transformParseQueries;
	}
	/*** Parse ***/

	/*** Background job */
	public static awsS3UploadIsEnable() {
		const awsS3IsEnable = FeatureToggle.getValue('AWS_S3_IS_ACTIVE');
		Logger.printFeatureToggleMessage(`apiCanCreateRecords value is equal to: ${awsS3IsEnable}`);

		return awsS3IsEnable;
	}
	/*** Background job */

	public static getValue(key) {
		let value = true;
		if (process.env.hasOwnProperty(key)) {
			value = (parseInt(process.env[key]) === 1);
		}

		return value;
	}
}
