/* eslint-disable import/extensions */
/* eslint-disable no-useless-constructor */
import BaseError from './BaseError.js';

class GeneralError extends BaseError {
  constructor(name, httpCode, isOperational, description) {
    super(name, httpCode, isOperational, description);
  }
}

export default GeneralError;
