const apiResponse = {
  success: (res, data = null, message = "Success", statusCode = 200) => {
    if (res.headersSent) return;
    return res.status(statusCode).send({
      success: true,
      statusCode: statusCode,
      message: message,
      data,
    });
  },

  error: (res, message = "Something went wrong", statusCode = 500, error = null) => {
    if (res.headersSent) return;
    return res.status(statusCode).send({
      success: false,
      statusCode: statusCode,
      message: message,
      error: error,
    });
  },

  validationError: (res, errors, message = "Validation failed") => {
    if (res.headersSent) return;
    return res.status(400).send({
      success: false,
      statusCode: 400,
      message: message,
      errors: errors,
    });
  },

  notFound: (res, message = "Resource not found") => {
    return res.status(404).send({
      success: false,
      statusCode: 404,
      message: message,
    });
  },

  unauthorized: (res, message = "Unauthorized access") => {
    return res.status(401).send({
      success: false,
      statusCode: 401,
      message: message,
    });
  },

  forbidden: (res, message = "Access forbidden") => {
    return res.status(403).send({
      success: false,
      statusCode: 403,
      message: message,
    });
  },

  alreadyExists: (res, message = "Already Exists") => {
    return res.status(400).send({
      success: false,
      statusCode: 400,
      message: message,
    });
  },
};

export default apiResponse;