const mock = require("mock-fs");

export class MockHelper {
	public static createMock(done: Function) {
		mock({
			'files': mock.directory({
				items: {
				}
			})
		});

		done();
	}

	public static createMockAndFiles(items) {
		mock({
			'files': mock.directory({
				items: items
			})
		});
	}

	public static restoreMock(done: Function) {
		mock.restore();

		done();
	}
}
