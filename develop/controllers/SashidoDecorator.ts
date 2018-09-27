import { createParamDecorator, Action } from "routing-controllers";
import { AuthService } from "../auth/AuthService";
import { SashidoApplication } from "../helpers/sashido/SashidoApplication";

export function SashidoDecorator (options?: { required?: boolean }) {
	return createParamDecorator({
			required: options && options.required ? true : false,
			value: async (action: Action) => {
					const authService: AuthService = 
						AuthService.initialize(action.request.headers);
			
					await authService.authenticateMyApp();	
					if (authService.hasDatabaseUri()) {
						const sashidoApp = SashidoApplication.createSashidoApplication(authService);
					
						return sashidoApp;
					}

					return null;
			}
	});
}
