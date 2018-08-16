
class ProgressMockObject {

	static defaultMongoDBValues() {
		return {
			"type": "MONGODB",
			"percent": 0
		}
	}

	static defaultAWSDBValues() {
		return {
			"type": "AWS",
			"percent": 0
		}
	}
}

 export default ProgressMockObject;