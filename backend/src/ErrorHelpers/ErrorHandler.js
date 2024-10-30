/* eslint-disable class-methods-use-this */

import { sendErrorResponse } from '../utils/sendResponses.js';
import BaseError from './BaseError.js';

class ErrorHandler {
  async handleError(err, res) {
    // handle loggin later
    if (err instanceof BaseError) {
      console.error(err.message);
      await sendErrorResponse(res, err.httpCode, err.message);
    }
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export default new ErrorHandler();
