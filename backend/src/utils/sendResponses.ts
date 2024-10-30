import { Response } from 'express';

/**
 * Sends an error response.
 * @param res - The Express response object.
 * @param code - The HTTP status code.
 * @param errorMessage - The error message to send in the response.
 * @returns The response object with error information.
 */
export const sendErrorResponse = (res: Response, code: number, errorMessage: string) => res.status(code).send({
  status: 'error',
  error: errorMessage,
});

/**
 * Sends a success response.
 * @param res - The Express response object.
 * @param code - The HTTP status code.
 * @param data - The data to send in the response.
 * @returns The response object with success information.
 */
export const sendSuccessResponse = <T>(res: Response, code: number, data: T) => res.status(code).send({
  status: 'success',
  data,
});

/**
 * Sends a success response with pagination information.
 * @param res - The Express response object.
 * @param code - The HTTP status code.
 * @param data - The data to send in the response.
 * @param pagination - The pagination information.
 * @returns The response object with success and pagination information.
 */
export const sendSuccessResponseWithPagination = <T>(res: Response, code: number, data: T) => res.status(code).send({
  status: 'success',
  data,
});
