import { assert } from "chai";
import { AWSS3 } from "../../helpers/aws/AWSS3";

describe('AWSS3', () => {
	describe('S3 Configurations', () => {

		describe('bucketName', () => {
			it('positive test', () => {
				const bucketName = process.env.TANTALUS_S3_BUCKET;

				assert.equal(bucketName, AWSS3.getBucketName());
			});

			it ('negative test', () => {
				assert.notEqual(null, AWSS3.getBucketName());
			});
		}); // end bucketName testing

		describe('access key', () => {
			it('positive test', () => {
				const acessKey = process.env.TANTALUS_S3_ACCESS_KEY_ID;

				assert.equal(acessKey, AWSS3.getAccessKey());
			});

			it('negative test', () => {
				assert.notEqual(null, AWSS3.getAccessKey());
			});
		}); // end access key testing

		describe('secret access key', () => {
			it('positive test', () => {
				const secretKey = process.env.TANTALUS_S3_SECRET_ACCESS_KEY;

				assert.equal(secretKey, AWSS3.getSecretAccessKey());
			});

			it ('negative test', () => {
				assert.notEqual(null, AWSS3.getSecretAccessKey());
			});
		}); // end secret key testing

		describe('amazon region', () => {
			it('positive test', () => { 
				const region = process.env.TANTALUS_AMAZON_REGION;

				assert.equal(region, AWSS3.getAmazonRegion());
			});

			it('negative test', () => {
				assert.notEqual(null, AWSS3.getAmazonRegion());
			});
		}); // end amazon region testing

	});
});
