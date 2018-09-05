import { NodeEnv } from "../../enums/NodeEnv";

class SashidoApplication {

	public applicationId: string;
	public masterKey: string;

	public static createSashidoApplication(): SashidoApplication {
		const env = process.env.NODE_ENV;

		switch (env) {
			case NodeEnv.PROD:
				return SashidoApplication.createAppByProdConfigurations();
			case NodeEnv.TEST:
				return SashidoApplication.createAppByTestingConfigurations();
			case NodeEnv.DEVELOP:
				return SashidoApplication.createAppByDevelopConfigurations();
			default:
				break;
		}
	}

	/*** Production  ***/
	private static createAppByProdConfigurations() {
		const app = new SashidoApplication();

		return app;
	}

	/*** Testing  ***/
	private static createAppByTestingConfigurations() {
		const app = new SashidoApplication();
		
		return app;
	}

	/*** Develop ***/
	private static createAppByDevelopConfigurations() {
		const app = new SashidoApplication();

		return app;
	}
}
