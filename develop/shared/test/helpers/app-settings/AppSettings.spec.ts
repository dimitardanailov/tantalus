import { assert } from "chai";
import { AppSettings } from "../../../helpers/app-settings/AppSettings";

describe('AppSettings', () => {

	describe('TUS end point', () => {
		it('positive', () => {
			assert.equal('/tus/aws/uploads', AppSettings.getTusUploadEndPoint());
		});

		it('negative', () => {
			assert.notEqual(null, AppSettings.getTusUploadEndPoint());
		});
	}); // TUS end point testing

	describe('file System TempDir', () => {
		it('positive test', () => {
			const tempDir = process.env.TEMP_DIR || process.env.TANTALUS_TEMP_DIR;

			assert.equal(tempDir, AppSettings.getFileSystemTempDir());
		});

		it('negative test', () => {
			assert.notEqual(null, AppSettings.getFileSystemTempDir());
		}); 
	}); // file system temp dir testing
});
