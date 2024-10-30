/**
   * @param {res} resposne Input parameter
   * @param {code} the response code
   * @param {errorMessage} response error message
   * @return response object {@link res}
   */
export const sendErrorResponse = (res, code, errorMessage) => res.status(code).send({
  status: 'error',
  error: errorMessage,
});

/**
   * @param {res} resposne Input parameter
   * @param {code} the response code
   * @param {errorMessage} response error message
   * @return response object {@link res}
   */
export const sendSuccessResponse = (res, code, data) => res.status(code).send({
  status: 'success',
  data,
});

/**
   * @param {res} resposne Input parameter
   * @param {code} the response code
   * @param {errorMessage} response error message
   * @return response object {@link res}
   */
export const sendSuccessResponseWithPagination = (res, code, data, pagination) => res.status(code).send({
  status: 'success',
  data,
  pagination,
});
