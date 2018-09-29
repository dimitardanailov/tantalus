import fs = require('fs'); 
import zlib = require('zlib');
import { Logger } from '../../../shared/helpers/logger/Logger';
import { Writable, Readable } from 'stream';


export class Stream  { 

	/*** Input ***/
	private _input: Readable = new Readable({
		read() {}
	});

	public get input(): Readable {
		return this._input; 
	}

	constructor() {
	}

	/*** Output  ***/
	private _output: Writable;
	public get output(): Writable {
		return this._output;
	}
	/*** Stream ***/
}
