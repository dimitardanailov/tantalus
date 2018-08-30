import { assert, expect } from "chai";
import { TantalusLogger } from "../../../helpers/logger/TantalusLogger";
import { TantalusAWSS3 } from "../../../helpers/aws/TantalusAWSS3";

describe('TantalusAWSS3', () => {
	describe('S3 Configurations', () => {

		describe('bucketName', () => {
			it('positive test', () => {
				const bucketName = process.env.TANTALUS_S3_BUCKET;

				assert.equal(bucketName, TantalusAWSS3.getBucketName());
			});

			it ('negative test', () => {
				assert.notEqual(null, TantalusAWSS3.getBucketName());
			});
		}); // end bucketName testing

		describe('access key', () => {
			it('positive test', () => {
				const acessKey = process.env.TANTALUS_S3_ACCESS_KEY_ID;

				assert.equal(acessKey, TantalusAWSS3.getAccessKey());
			});

			it('negative test', () => {
				assert.notEqual(null, TantalusAWSS3.getAccessKey());
			});
		}); // end access key testing

		describe('secret access key', () => {
			it('positive test', () => {
				const secretKey = process.env.TANTALUS_S3_SECRET_ACCESS_KEY;

				assert.equal(secretKey, TantalusAWSS3.getSecretAccessKey());
			});

			it ('negative test', () => {
				assert.notEqual(null, TantalusAWSS3.getSecretAccessKey());
			});
		}); // end secret key testing

		describe('amazon region', () => {
			it('positive test', () => { 
				const region = process.env.TANTALUS_AMAZON_REGION;

				assert.equal(region, TantalusAWSS3.getAmazonRegion());
			});

			it('negative test', () => {
				assert.notEqual(null, TantalusAWSS3.getAmazonRegion());
			});
		}); // end amazon region testing

	});
});
