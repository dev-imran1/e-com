class ApiResponse {
    constructor(statusCode, message  = "sucess", data = null){
        this.statusCode = statusCode,
        this.message = message,
        this.data = data
    }
}

export default ApiResponse