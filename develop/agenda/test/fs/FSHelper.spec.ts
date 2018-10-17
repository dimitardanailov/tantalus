const chai = require('chai');
import { assert, expect } from "chai";
import { Logger } from "../../../shared/helpers/logger/Logger";
import { FSHelper } from "../../helpers/fs/FSHelper";

describe('FSHelper', () => {

	const path = 'files/file';

	describe('check delete fs delete', () => {
		const mock = require("mock-fs");
		chai.use(require('chai-fs'));

		beforeEach(done => {
			mock({
				'files': mock.directory({
					items: {
						file: 'content'
					}
				})
			});

			done();
		});

		afterEach(done => {
			mock.restore();
			
			done();
		});

		it('mock-fs can create a file', () => {
			expect('files/file').to.be.a.file();
		});

		it('helper can delete a file', async () => {
			const promise = await FSHelper.deleteFile(path);
			
			assert.notPathExists(path);
			expect(promise).to.equal(true);
		})
	});
})
