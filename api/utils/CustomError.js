/**
 * CustomError class for creating custom error instances.
 * @class
 * @extends Error
 */
export default class CustomError extends Error {
  /**
   * Creates a new instance of the CustomError class.
   * @param {string} message - The error message associated with the custom error.
   * @param {number} statusCode - The HTTP status code for the error (e.g., 404, 500).
   * @param {string} [name="CustomError"] The name associated with the custom error.
   */
  constructor(message, statusCode, name = "CustomError", data = {}) {
    super(message);
    /**
     * Name for CustomError Instance defaults to "CustomError"
     * @type {string}
     */
    this.name = name;
    /**
     * The HTTP status code associated with the error.
     * @type {number}
     */
    this.statusCode = statusCode;
    /**
     * The status string derived from the statusCode.
     * If statusCode is in the range [400, 500), status is "fail".
     * Otherwise (for server errors), status is "error".
     * @type {string}
     */
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    /**
     * Indicates whether the error is operational (true) or a programming error (false).
     * @type {boolean}
     */
    this.isOperational = true;
    /**
     * The call stack trace captured when the error object was created.
     * @type {string}
     */
    Error.captureStackTrace(this, this.constructor);
    /**
     * @type {object} Data to be returned in the production response.
     */
    this.data = data;
  }
}
