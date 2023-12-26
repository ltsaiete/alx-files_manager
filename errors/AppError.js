export default class AppError {
  constructor(statusCode = 400, error = 'Internal server error') {
    this.statusCode = statusCode;
    this.error = error;
  }
}
