/**
 * Asynchronous error handler.
 * Wraps a function in a try-catch block to handle rejected promises.
 *
 * @param {Function} fn - The asynchronous function to wrap.
 * @returns {Function} - A new function that catches any errors thrown by the original function and passes them to the next middleware.
 *
 * @example
 * app.get('/', asyncErrorHandler(async (req, res, next) => {
 *   // Your code here...
 * }));
 */
export default function asyncErrorHandler(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}
