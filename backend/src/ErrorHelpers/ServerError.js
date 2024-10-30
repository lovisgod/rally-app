import BaseError from './BaseError.js';
import HttpStatusCode from './Statuscode.js';

class ServerError extends BaseError {
  constructor(name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true, description = 'internal server error') {
    super(name, httpCode, isOperational, description);
  }
}

export default ServerError;
