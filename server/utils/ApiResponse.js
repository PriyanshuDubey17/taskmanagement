class ApiResponse {
    constructor(statusCode, message = "success", userData) {
      this.statusCode = statusCode || 200;
      this.message = message || "kam ho gya";
      this.success = true;
      this.userData =userData;
    }
  }
  
  module.exports = ApiResponse;
  