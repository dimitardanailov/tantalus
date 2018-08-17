
export class ProgressMockObject {

	public static defaultMongoDBValues(): Object {
		return {
			"type": "MONGODB",
			"percent": 0
		}
	}

	public static defaultAWSDBValues(): Object {
		return {
			"type": "AWS",
			"percent": 0
		}
	}
}