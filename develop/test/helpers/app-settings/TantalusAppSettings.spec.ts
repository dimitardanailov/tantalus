import { assert } from "chai";
import { TantalusAppSettings } from "../../../helpers/app-settings/TantalusAppSettings";

describe('TantalusAppSettings', () => {

	describe('TUS end point', () => {
		it('positive', () => {
			assert.equal('/tus/aws/uploads', TantalusAppSettings.getTusUploadEndPoint());
		});

		it('negative', () => {
			assert.notEqual(null, TantalusAppSettings.getTusUploadEndPoint());
		});
	}); // TUS end point testing

	describe('file System TempDir', () => {
		it('positive test', () => {
			const tempDir = process.env.TANTALUS_TEMP_DIR;

			assert.equal(tempDir, TantalusAppSettings.getFileSystemTempDir());
		});

		it('negative test', () => {
			assert.notEqual(null, TantalusAppSettings.getFileSystemTempDir());
		}); 
	}); // file system temp dir testing
});
