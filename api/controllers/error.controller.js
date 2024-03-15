import CustomError from "../utils/CustomError.js";

// sends response for the development env
function devErrors(res, err) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stackTrace: err.stack,
    error: err,
    data: err.data,
  });
}

// sends response for the production env
function prodErrors(res, err) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      data: err.data,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal server error :(",
      data: {},
    });
  }
}

// Todo: rework this CustomError for the Invalid mongooseId error
function castErrorHandler(err) {
  const msg = `Invalid value for ${err.path}: ${err.value}`;
  return new CustomError(msg, 400);
}

// Validation errors thrown by mongoose or mongoose-unique-valdiator
function validationErrorHandler(err) {
  const msg = err._message;
  const data = {
    errors: Object.values(err.errors).map((val) => {
      return { path: val.path, kind: val.kind, message: val.message };
    }),
  };
  return new CustomError(msg, 400, err.name, data);
}

// JwtToken expired
function tokenExpiredErrorHandler(err) {
  return new CustomError(err.message, 401, err.name);
}

// jwt error
function jwtErrorHandler(err) {
  return new CustomError(err.message, 401, err.name);
}

// We can either include or exclude but not both
function limitFieldsError(err) {
  return new CustomError(err.message, 400, err.name);
}

export default function (err, req, res, next) {
  // Customize the err object based on the err here.
  if (err.name == "CastError") err = castErrorHandler(err);
  if (err.name == "ValidationError") err = validationErrorHandler(err);
  if (err.name == "TokenExpiredError") err = tokenExpiredErrorHandler(err);
  if (err.name == "JsonWebTokenError") err = jwtErrorHandler(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // use dev errors for developemnt enviroment
  if (process.env.NODE_ENV === "development") {
    devErrors(res, err);
    return;
  }

  prodErrors(res, err);
  return;
}
