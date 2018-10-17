const chai = require('chai');
import { expect } from "chai";
import { ZipHelper } from "../../helpers/zip/ZipHelper";
import { Logger } from "../../../shared/helpers/logger/Logger";
import { promises } from "fs";

describe('Zip helper', () => {
	
	const directory = 'files';
	const filename = 'myfile'
	const path = `${directory}/${filename}`;

	describe('createZipFile', () => {
		const mock = require("mock-fs");
		chai.use(require('chai-fs'));

		beforeEach(done => {
			mock({
				'files': mock.directory({
					items: {
						myfile: Buffer.from('content ...')
					}
				})
			});

			done();
		});

		afterEach(done => {
			mock.restore();
			
			done();
		});

		it('mock file exists', () => {
			expect(path).to.be.a.file();
		})

		it('check zip exists', async () => {
			await ZipHelper.createZipFile(path);

			expect(`${path}.zip`).to.be.a.file();
		});
	});
});

