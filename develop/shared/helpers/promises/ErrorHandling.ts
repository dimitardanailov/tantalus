import { Logger } from "../logger/Logger";

export class ErrorHandling {
	public static throwCrash(error) {
		Logger.fatal(error);
		throw error;
	}
} 
