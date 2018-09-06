import { createParamDecorator, Action } from "routing-controllers";
import { TantalusAuthService } from "../auth/TantalusAuthService";
import { SashidoApplication } from "../helpers/sashido/SashidoApplication";

export function SashidoDecorator (options?: { required?: boolean }) {
	return createParamDecorator({
			required: options && options.required ? true : false,
			value: async (action: Action) => {
					const authService: TantalusAuthService = 
						TantalusAuthService.initialize(action.request.headers);
			
					await authService.authenticateMyApp();	
					if (authService.hasDatabaseUri()) {
						const sashidoApp = SashidoApplication.createSashidoApplication(authService);
					
						return sashidoApp;
					}

					return null;
			}
	});
}
