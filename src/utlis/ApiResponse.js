class ApiResponse {
    constructor(statusCode = 200, message = "sucess", data = null) {
        this.statusCode = statusCode,
            this.message = message,
            this.data = data
    }
    apiLoginRes(data){
        return new ApiResponse(201, "Lgoin succesfull",data)
    }
    apiLogOutRes(data){
        return new ApiResponse(201, "Lgo Out succesfull",data)
    }
}

export default ApiResponse