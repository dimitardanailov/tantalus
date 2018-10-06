const chai = require('chai');
import { assert, expect } from "chai";
import { Health } from "../../helpers/health/Health";
import { Logger } from "../../../shared/helpers/logger/Logger";

describe('Health', () => {

	describe('LOCATION variable', ()=> {
		
		it('positive', () => {
			assert.equal('agenda/health', Health.LOCATION);
		});

		it('negative', () => {
			assert.notEqual(null, Health.LOCATION);
		});
	});

	describe('createHealthFile', () => {
		const mock = require("mock-fs");
		chai.use(require('chai-fs'));

		beforeEach(done => {
			mock({
				'agenda': mock.directory({
					items: {
						health: 'health checker'
					}
				})
			});

			done();
		});

		afterEach(done => {
			mock.restore();
			
			done();
		});

		it('createHealthFile', () => {
			Health.createHealthFile();

			// @ts-ignore: chai-fs typings are not supported
			expect(Health.LOCATION).to.be.a.file();
		});

		it('file should be not an empty', () => {
			// @ts-ignore: chai-fs typings are not supported
			assert.notIsEmptyFile(Health.LOCATION);
		})
	});
});
